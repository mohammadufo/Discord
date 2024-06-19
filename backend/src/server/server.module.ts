import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerResolver } from './server.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ServerService, ServerResolver, PrismaService],
})
export class ServerModule {}
