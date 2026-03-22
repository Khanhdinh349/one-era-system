import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(@Body() data: any) {
    return this.registrationsService.create(data);
  }

  @Get()
  findAll() {
    return this.registrationsService.findAll();
  }

  @Get('check')
  async checkStatus(
    @Query('contact') contact: string,
    @Query('phone') phone: string // Thêm dòng này để nhận cả tham số 'phone'
  ) {
    // Ưu tiên cái nào có giá trị thì dùng cái đó
    const identity = contact || phone; 
    return this.registrationsService.findByContact(identity);
  }
}