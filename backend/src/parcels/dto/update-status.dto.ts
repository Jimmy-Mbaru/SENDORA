import { IsEnum } from 'class-validator';
import { ParcelStatus } from 'generated/prisma';

export class UpdateStatusDto {
  @IsEnum(ParcelStatus)
  status: ParcelStatus;
}
