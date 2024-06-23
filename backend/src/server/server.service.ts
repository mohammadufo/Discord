import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateServerDto } from './dtos/create-server.dto';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from 'src/member/member.types';
import { ApolloError } from 'apollo-server-express';
import { UpdateServerDto } from './dtos/update-server.dto';
import { CreateChannelOnServerDto } from './dtos/create-channel.dto';
import { ChannelType } from './types';
@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async createServer(input: CreateServerDto, imageUrl: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: input.profileId,
      },
    });
    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    return this.prisma.server.create({
      data: {
        ...input,
        imageUrl,
        inviteCode: uuidv4(),

        channels: {
          create: [
            {
              name: 'general',
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },

      include: {
        members: true,
      },
    });
  }

  async getServer(id: number, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { email },
    });

    if (!profile) {
      return new ApolloError('Profile not found!!!', 'PROFILE_NOT_FOUND');
    }

    const server = await this.prisma.server.findUnique({
      where: {
        id,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        channels: true,
        members: {
          include: {
            profile: true,
            server: true,
          },
        },
      },
    });
    if (!server) return new ApolloError('Server not found', 'SERVER_NOT_FOUND');
    return server;
  }

  async getServersByProfileEmailOfMember(email: string) {
    return await this.prisma.server.findMany({
      where: {
        members: {
          some: {
            profile: {
              email,
            },
          },
        },
      },
    });
  }

  async updateServerWithNewInviteCode(serverId: number) {
    const server = await this.prisma.server.findUnique({
      where: {
        id: serverId,
      },
    });

    if (!server) {
      throw new NotFoundException('Server Not found!');
    }

    return this.prisma.server.update({
      where: {
        id: serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
  }

  async updateServer(input: UpdateServerDto, imageUrl: string) {
    const server = await this.prisma.server.findUnique({
      where: {
        id: input.serverId,
      },
    });

    if (!server) {
      throw new NotFoundException('Server not found!');
    }

    return this.prisma.server.update({
      where: {
        id: input.serverId,
      },
      data: {
        name: input.name,
        imageUrl,
      },
    });
  }

  async createChannel(input: CreateChannelOnServerDto, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });

    if (!profile) {
      throw new UnauthorizedException();
    }

    return this.prisma.server.update({
      where: {
        id: input.serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name: input.name,
            profileId: profile.id,
            type: ChannelType[input.type],
          },
        },
      },
    });
  }
}
