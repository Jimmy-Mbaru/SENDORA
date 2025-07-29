import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/decorators/roles.guard';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('parcels')
@UseGuards(JwtAuthGuard)
export class ParcelsController {
  constructor(private readonly parcelsService: ParcelsService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateParcelDto) {
    return this.parcelsService.createParcel(dto);
  }

  @Get()
  getAll(@Request() req) {
    return this.parcelsService.getAllParcels(req.user);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @Request() req) {
    return this.parcelsService.getParcelById(id, req.user);
  }

  @Patch(':id/status')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.parcelsService.updateStatus(id, dto);
  }
}
