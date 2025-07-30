import {
  IsEnum,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { WeightCategory } from 'generated/prisma';

export class CreateParcelDto {
  @IsNotEmpty()
  description: string;

  @IsEnum(WeightCategory)
  weightCategory: 'LIGHT' | 'MEDIUM' | 'HEAVY';

  @IsUUID()
  pickupLocationId: string;

  @IsUUID()
  deliveryLocationId: string;

  @IsUUID()
  senderId: string;

  @IsUUID()
  recipientId: string;
}
