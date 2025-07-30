import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) { }

  async getDashboardStats() {
    const [delivered, inTransit, totalUsers, recentParcels] = await Promise.all([
      this.prisma.parcel.count({ where: { status: 'DELIVERED' } }),
      this.prisma.parcel.count({ where: { status: 'IN_TRANSIT' } }),
      this.prisma.user.count(),
      this.prisma.parcel.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          pickupLocation: true,
          deliveryLocation: true,
        },
      }),
    ]);

    const formattedParcels = recentParcels.map((p) => ({
      id: p.id,
      pickup: p.pickupLocation.name,       // Assuming Location has a "name" field
      destination: p.deliveryLocation.name,
      status: p.status === 'DELIVERED' ? 'Delivered' : 'In Transit',
    }));

    return {
      delivered,
      inTransit,
      totalUsers,
      recentParcels: formattedParcels,
    };
  }



}
