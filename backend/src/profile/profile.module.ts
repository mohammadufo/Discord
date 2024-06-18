import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProfileResolver, ProfileService, PrismaService],
})
export class ProfileModule {}
