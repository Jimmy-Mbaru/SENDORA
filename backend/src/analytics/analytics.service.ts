// src/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [delivered, inTransit, totalUsers] = await Promise.all([
      this.prisma.parcel.count({ where: { status: 'DELIVERED' } }),
      this.prisma.parcel.count({ where: { status: 'IN_TRANSIT' } }),
      this.prisma.user.count(),
    ]);

    return {
      delivered,
      inTransit,
      totalUsers,
      pieChartData: [
        { status: 'DELIVERED', count: delivered },
        { status: 'IN_TRANSIT', count: inTransit },
      ],
    };
  }
}
