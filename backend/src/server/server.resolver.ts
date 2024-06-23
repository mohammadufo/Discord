import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Server } from './types';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { ApolloError } from 'apollo-server-express';
import { ServerService } from './server.service';
import { IUpdatedRequest } from '../types/index';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { CreateServerDto } from './dtos/create-server.dto';
import { UpdateServerDto } from './dtos/update-server.dto';
import { CreateChannelOnServerDto } from './dtos/create-channel.dto';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => String)
  async hello() {
    return 'I love Alaa💕';
  }

  @Query(() => [Server])
  async getServers(@Context() ctx: { req: IUpdatedRequest }) {
    if (!ctx.req?.profile.email) {
      throw new UnauthorizedException('Token is not valid!');
    }
    return await this.serverService.getServersByProfileEmailOfMember(
      ctx.req?.profile.email,
    );
  }

  @Query(() => Server)
  async getServer(
    @Context() ctx: { req: IUpdatedRequest },
    @Args('id', { nullable: true }) id: number,
  ) {
    if (!ctx.req?.profile.email) {
      throw new UnauthorizedException('Token is not valid!');
    }
    return this.serverService.getServer(id, ctx.req?.profile.email);
  }

  @Mutation(() => Server)
  async createServer(
    @Args('input') input: CreateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload,
  ) {
    if (!file) throw new ApolloError('Image is required', 'IMAGE_REQUIRED');
    const imageUrl = await this.storeImageAndGetUrl(file);

    return this.serverService.createServer(input, imageUrl);
  }

  async storeImageAndGetUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;

    if (!existsSync(join(process.cwd(), 'public', 'images'))) {
      mkdirSync(join(process.cwd(), 'public', 'images'), { recursive: true });
    }

    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return imageUrl;
  }

  @Mutation(() => Server)
  async updateServer(
    @Args('input') input: UpdateServerDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload,
  ) {
    let imageUrl;

    if (file) {
      imageUrl = await this.storeImageAndGetUrl(file);
    }
    try {
      return this.serverService.updateServer(input, imageUrl);
    } catch (err) {
      throw new ApolloError(err.message, err.code);
    }
  }

  @Mutation(() => Server)
  async updateServerWithNewInviteCode(
    @Args('serverId', { nullable: true }) serverId: number,
  ) {
    if (!serverId)
      throw new ApolloError('Server id is required', 'SERVER_ID_REQUIRED');
    try {
      return this.serverService.updateServerWithNewInviteCode(serverId);
    } catch (err) {
      throw new ApolloError(err.message, err.code);
    }
  }

  @Mutation(() => Server)
  async createChannel(
    @Args('input') input: CreateChannelOnServerDto,
    @Context() ctx: { req: IUpdatedRequest },
  ) {
    try {
      return this.serverService.createChannel(input, ctx.req?.profile.email);
    } catch (err) {
      throw new ApolloError(err.message, err.code);
    }
  }
}
