import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ServerResolver {
  @Query(() => String)
  async hello() {
    return 'I love Alaa💕';
  }
}
