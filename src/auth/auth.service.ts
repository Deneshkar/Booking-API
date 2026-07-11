import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create(
      dto.email,
      hashedPassword,
      dto.name,
    );

    return this.buildAuthResponse(user.id, user.email, user.name);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user.id, user.email, user.name);
  }

  async refresh(dto: RefreshTokenDto) {
    let payload: { sub: string; email: string };

    try {
      payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_SECRET',
        ),
      });
    } catch {
      throw new UnauthorizedException(
        'Invalid or expired refresh token',
      );
    }

    const user = await this.usersService.findByIdWithRefreshToken(
      payload.sub,
    );

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    const tokenMatches = await bcrypt.compare(
      dto.refreshToken,
      user.hashedRefreshToken,
    );

    if (!tokenMatches) {
      throw new UnauthorizedException('Access denied');
    }

    return this.buildAuthResponse(user.id, user.email, user.name);
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.setRefreshToken(userId, null);
  }

  private async buildAuthResponse(
    userId: string,
    email: string,
    name: string | null,
  ) {
    const payload = {
      sub: userId,
      email,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      expiresIn: this.configService.getOrThrow<StringValue>(
        'JWT_EXPIRES_IN',
      ),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>(
        'JWT_REFRESH_SECRET',
      ),
      expiresIn: this.configService.getOrThrow<StringValue>(
        'JWT_REFRESH_EXPIRES_IN',
      ),
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.usersService.setRefreshToken(
      userId,
      hashedRefreshToken,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: userId,
        email,
        name,
      },
    };
  }
}