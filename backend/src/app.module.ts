import { LocationsModule } from './locations/locations.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ParcelsModule } from './parcels/parcels.module';
import { UsersModule } from './users/users.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [AuthModule, ParcelsModule, LocationsModule, UsersModule, AnalyticsModule,], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
