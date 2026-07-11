import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Service } from '../services/service.entity';
import { BookingStatus } from './booking-status.enum';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    // Rule 1: Booking must belong to an existing service
    const service = await this.serviceRepository.findOne({
      where: { id: dto.serviceId },
    });

    if (!service) {
      throw new NotFoundException(
        `Service with ID ${dto.serviceId} not found`,
      );
    }

    // Rule 2: Booking date cannot be in the past
    this.validateNotPastDate(dto.bookingDate);

    // Prevent duplicate bookings
    const duplicate = await this.bookingRepository.findOne({
      where: {
        serviceId: dto.serviceId,
        bookingDate: dto.bookingDate,
        bookingTime: dto.bookingTime,
      },
    });

    if (duplicate) {
      throw new ConflictException(
        'A booking already exists for this service at the selected date and time',
      );
    }

    const booking = this.bookingRepository.create({
      ...dto,
      status: BookingStatus.PENDING,
    });

    return this.bookingRepository.save(booking);
  }

  async findAll(status?: BookingStatus): Promise<Booking[]> {
    const where = status ? { status } : {};

    return this.bookingRepository.find({
      where,
      relations: {
        service: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async updateStatus(
    id: string,
    dto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);

    // Rule 3: Cancelled bookings cannot be marked as completed
    if (
      booking.status === BookingStatus.CANCELLED &&
      dto.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'A cancelled booking cannot be marked as completed',
      );
    }

    booking.status = dto.status;

    return this.bookingRepository.save(booking);
  }

  async cancel(id: string): Promise<Booking> {
    const booking = await this.findOne(id);

    booking.status = BookingStatus.CANCELLED;

    return this.bookingRepository.save(booking);
  }

  private validateNotPastDate(bookingDate: string): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(bookingDate);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      throw new BadRequestException(
        'Booking date cannot be in the past',
      );
    }
  }
}