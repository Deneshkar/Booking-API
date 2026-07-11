import {
  IsString,
  IsEmail,
  IsUUID,
  IsDateString,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  customerName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({ example: '0771234567' })
  @IsString()
  customerPhone: string;

  @ApiProperty({ example: 'b3f1c2a4-1234-4d56-8abc-1234567890ab' })
  @IsUUID()
  serviceId: string;

  @ApiProperty({ example: '2026-08-01', description: 'Format: YYYY-MM-DD' })
  @IsDateString()
  bookingDate: string;

  @ApiProperty({ example: '14:30', description: 'Format: HH:mm' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'bookingTime must be in HH:mm or HH:mm:ss format',
  })
  bookingTime: string;

  @ApiPropertyOptional({ example: 'Please call before arriving' })
  @IsOptional()
  @IsString()
  notes?: string;
}