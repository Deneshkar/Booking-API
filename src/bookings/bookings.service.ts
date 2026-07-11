import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  ILike,
  FindOptionsWhere,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Service } from '../services/service.entity';
import { BookingStatus } from './booking-status.enum';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResult } from '../common/dto/paginated-result.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const service = await this.serviceRepository.findOne({
      where: { id: dto.serviceId },
    });

    if (!service) {
      throw new NotFoundException(
        `Service with ID ${dto.serviceId} not found`,
      );
    }

    this.validateNotPastDate(dto.bookingDate);

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

  async findAll(
    pagination: PaginationDto,
    status?: BookingStatus,
    search?: string,
  ): Promise<PaginatedResult<Booking>> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    let where:
      | FindOptionsWhere<Booking>
      | FindOptionsWhere<Booking>[];

    if (search) {
      const searchCondition = ILike(`%${search}%`);

      where = [
        {
          customerName: searchCondition,
          ...(status ? { status } : {}),
        },
        {
          customerEmail: searchCondition,
          ...(status ? { status } : {}),
        },
        {
          customerPhone: searchCondition,
          ...(status ? { status } : {}),
        },
      ];
    } else {
      where = status ? { status } : {};
    }

    const [data, total] = await this.bookingRepository.findAndCount({
      where,
      relations: {
        service: true,
      },
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(
        `Booking with ID ${id} not found`,
      );
    }

    return booking;
  }

  async updateStatus(
    id: string,
    dto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);

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