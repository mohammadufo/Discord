import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerResolver } from './server.resolver';

@Module({
  providers: [ServerService, ServerResolver]
})
export class ServerModule {}
