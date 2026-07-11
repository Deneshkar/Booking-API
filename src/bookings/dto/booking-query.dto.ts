import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { BookingStatus } from '../booking-status.enum';

export class BookingQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: BookingStatus,
    description: 'Filter bookings by status',
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional({
    description: 'Search by customer name, email, or phone',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;
}