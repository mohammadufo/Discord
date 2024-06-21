import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Server } from './types';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { ApolloError } from 'apollo-server-express';
import { ServerService } from './server.service';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => String)
  async hello() {
    return 'I love Alaa💕';
  }

  @Query(() => [Server])
  async getServers(@Context() ctx: { req: Request }) {
    if (!ctx.req?.profile.email)
      return new ApolloError('Profile not found', 'PROFILE_NOT_FOUND');

    return await this.serverService.getServersByProfileEmailOfMember(
      ctx.req?.profile.email,
    );
  }
}
