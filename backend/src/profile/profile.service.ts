import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDto } from './dtos/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(createProfileDto: CreateProfileDto) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        email: createProfileDto.email,
      },
    });

    if (profile) {
      throw new BadRequestException('This Email is already exist!');
    }

    return this.prismaService.profile.create({
      data: createProfileDto,
    });
  }

  async getProfileById(id: number) {
    return this.prismaService.profile.findUnique({
      where: {
        id,
      },
      include: {
        servers: {
          include: {
            channels: true,
          },
        },
      },
    });
  }

  async getProfileByEmail(email: string) {
    return this.prismaService.profile.findUnique({
      where: {
        email,
      },
      include: {
        servers: {
          include: {
            channels: true,
          },
        },
      },
    });
  }
}
