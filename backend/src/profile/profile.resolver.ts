import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './profile.type';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Profile)
  async create(@Args('input') input: CreateProfileDto) {
    return this.profileService.createProfile(input);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => Profile)
  async getProfileById(@Args('profiledId') profileId: number) {
    return this.profileService.getProfileById(profileId);
  }
}
