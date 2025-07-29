import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { WeightCategory } from 'generated/prisma';

export class CreateParcelDto {
  @IsNotEmpty()
  description: string;

  @IsEnum(WeightCategory)
  weightCategory: WeightCategory;

  @IsUUID()
  pickupLocationId: string;

  @IsUUID()
  deliveryLocationId: string;

  @IsUUID()
  senderId: string;

  @IsUUID()
  recipientId: string;

  @IsISO8601()
  estimatedArrival: string; // ISO Date string
}
