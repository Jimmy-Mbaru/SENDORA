import { Module } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { ParcelsController } from './parcels.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [PrismaModule, MailerModule],
  controllers: [ParcelsController],
  providers: [ParcelsService],
})
export class ParcelsModule {}
