import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateUser(userId: string, data: { name?: string; email?: string; cellphone?: string; paypal?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }


  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async getUserParcels(userId: string, requester: any) {
    const isAdmin = requester.role === 'ADMIN';
    const isSelf = requester.userId === userId;

    if (!isAdmin && !isSelf) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.parcel.findMany({
      where: {
        OR: [
          { senderId: userId },
          { recipientId: userId },
        ],
      },
    });
  }
}
