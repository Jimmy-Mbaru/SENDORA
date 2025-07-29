import { Controller, Get, Param, Request, UseGuards, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/decorators/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Patch('me')
  updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.userId, dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id/parcels')
  getUserParcels(@Param('id') id: string, @Request() req) {
    return this.usersService.getUserParcels(id, req.user);
  }
}
