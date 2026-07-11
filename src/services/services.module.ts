import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { AuthModule } from '../auth/auth.module'; // needed so JwtAuthGuard works here

@Module({
  imports: [TypeOrmModule.forFeature([Service]), AuthModule],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [TypeOrmModule, ServicesService],
})
export class ServicesModule {}