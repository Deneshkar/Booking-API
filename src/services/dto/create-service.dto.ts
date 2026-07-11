import { IsString, IsNumber, IsOptional, IsBoolean, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Haircut', description: 'Name of the service' })
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({ example: 'A basic haircut service' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 30, description: 'Duration in minutes' })
  @IsNumber()
  @Min(1)
  duration: number;

  @ApiProperty({ example: 15.5, description: 'Price of the service' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}