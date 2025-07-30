import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ParcelStatus, WeightCategory } from 'generated/prisma';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class ParcelsService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) { }

  private getWeightPrice(weight: WeightCategory): number {
    switch (weight) {
      case 'LIGHT': return 5.0;
      case 'MEDIUM': return 10.0;
      case 'HEAVY': return 15.0;
      default: throw new BadRequestException('Invalid weight category');
    }
  }

  private calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of Earth in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
      Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private getDistancePrice(distanceKm: number): number {
    const ratePer10Km = 10;
    return Math.ceil(distanceKm / 10) * ratePer10Km;
  }

  private calculateEta(distanceKm: number): Date {
    const eta = new Date();
    if (distanceKm < 50) {
      eta.setDate(eta.getDate() + 1);
    } else if (distanceKm < 150) {
      eta.setDate(eta.getDate() + 2);
    } else {
      eta.setDate(eta.getDate() + 3);
    }
    return eta;
  }

  async createParcel(dto: CreateParcelDto) {
    const [pickup, delivery, sender, recipient] = await Promise.all([
      this.prisma.location.findUnique({ where: { id: dto.pickupLocationId } }),
      this.prisma.location.findUnique({ where: { id: dto.deliveryLocationId } }),
      this.prisma.user.findUnique({ where: { id: dto.senderId } }),
      this.prisma.user.findUnique({ where: { id: dto.recipientId } }),
    ]);

    if (!pickup || !delivery) {
      throw new BadRequestException('Invalid pickup or delivery location');
    }

    if (
      pickup.latitude === null || pickup.longitude === null ||
      delivery.latitude === null || delivery.longitude === null
    ) {
      throw new BadRequestException('Pickup or delivery location coordinates are missing');
    }

    if (!sender || !recipient) {
      throw new BadRequestException('Invalid sender or recipient');
    }

    const distanceKm = this.calculateDistanceKm(
      pickup.latitude,
      pickup.longitude,
      delivery.latitude,
      delivery.longitude,
    );

    const weightPrice = this.getWeightPrice(dto.weightCategory);
    const distancePrice = this.getDistancePrice(distanceKm);
    const totalPrice = weightPrice + distancePrice;

    const etaDate = this.calculateEta(distanceKm);

    const parcel = await this.prisma.parcel.create({
      data: {
        ...dto,
        status: ParcelStatus.IN_TRANSIT,
        estimatedArrival: etaDate,
        priceAtCreation: totalPrice,
      },
    });

    await this.mailerService.sendMail({
      to: sender.email,
      subject: 'Parcel Sent!',
      template: 'parcel-created',
      context: {
        sender: sender.name,
        receiver: recipient.name,
        price: totalPrice,
        eta: etaDate.toDateString(),
      },
    });

    return parcel;
  }

  async getAllParcels(user: any) {
    const baseQuery = {
      include: {
        pickupLocation: { select: { name: true } },
        deliveryLocation: { select: { name: true } },
        sender: { select: { name: true } },
        recipient: { select: { name: true } },
      },
    };


    if (user.role === 'ADMIN') {
      return this.prisma.parcel.findMany(baseQuery);
    }

    return this.prisma.parcel.findMany({
      ...baseQuery,
      where: {
        OR: [
          { senderId: user.userId },
          { recipientId: user.userId },
        ],
      },
    });
  }

  async getParcelById(id: string, user: any) {
    const parcel = await this.prisma.parcel.findUnique({
      where: { id },
      include: {
        pickupLocation: { select: { name: true, latitude: true, longitude: true } },
        deliveryLocation: { select: { name: true, latitude: true, longitude: true } },
        sender: { select: { name: true } },
        recipient: { select: { name: true } },
      },
    });

    if (!parcel) throw new NotFoundException('Parcel not found');

    const isAdmin = user.role === 'ADMIN';
    const isAssociated = parcel.senderId === user.userId || parcel.recipientId === user.userId;

    if (!isAdmin && !isAssociated) {
      throw new ForbiddenException('Access denied');
    }

    return parcel;
  }


  async updateStatus(id: string, dto: UpdateStatusDto) {
    const parcel = await this.prisma.parcel.findUnique({ where: { id } });
    if (!parcel) throw new NotFoundException('Parcel not found');

    const [sender, recipient] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: parcel.senderId } }),
      this.prisma.user.findUnique({ where: { id: parcel.recipientId } }),
    ]);

    if (!sender || !recipient) {
      throw new BadRequestException('Invalid sender or recipient during status update');
    }

    const updated = await this.prisma.parcel.update({
      where: { id },
      data: {
        status: dto.status,
      },
    });

    if (dto.status === 'DELIVERED') {
      await this.mailerService.sendMail({
        to: sender.email,
        subject: 'Parcel Delivered!',
        template: 'status-delivered-sender',
        context: {
          sender: sender.name,
          receiver: recipient.name,
        },
      });

      await this.mailerService.sendMail({
        to: recipient.email,
        subject: 'Parcel Ready for Pickup!',
        template: 'status-delivered-receiver',
        context: {
          receiver: recipient.name,
          sender: sender.name,
        },
      });
    }

    return updated;
  }
}
