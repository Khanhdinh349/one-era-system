import { Module } from '@nestjs/common';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [RegistrationsModule],
})
export class AppModule {}