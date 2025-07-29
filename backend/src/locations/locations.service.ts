import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import axios from 'axios';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLocationDto) {
    const exists = await this.prisma.location.findUnique({
      where: { name: dto.name },
    });

    if (exists) throw new ConflictException('Location already exists');

    const coords = await this.geocodeWithNominatim(dto.name);

    return this.prisma.location.create({
      data: {
        name: dto.name,
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    });
  }

  async findAll() {
    return this.prisma.location.findMany({
      orderBy: { name: 'asc' },
    });
  }

  private async geocodeWithNominatim(location: string): Promise<{ latitude: number; longitude: number }> {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: location,
          format: 'json',
          limit: 1,
        },
        headers: {
          'User-Agent': 'sendora-backend/1.0 (your_email@example.com)', // Replace with your actual contact
        },
      });

      const result = response.data[0];
      if (!result) throw new BadRequestException('Invalid location name or not found');

      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      };
    } catch (err) {
      throw new BadRequestException('Failed to fetch coordinates from OpenStreetMap');
    }
  }
}
