import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findByIdWithRefreshToken(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        hashedRefreshToken: true,
      },
    });
  }

  async create(
    email: string,
    hashedPassword: string,
    name?: string,
  ): Promise<User> {
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    return this.userRepository.save(user);
  }

  async setRefreshToken(
    userId: string,
    hashedRefreshToken: string | null,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      hashedRefreshToken,
    });
  }
}