import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Profile } from './profile.type';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileService } from './profile.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  async createProfile(@Args('input') input: CreateProfileDto) {
    return this.profileService.createProfile(input);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => Profile)
  async getProfileById(@Args('profileId') profileId: number) {
    return this.profileService.getProfileById(profileId);
  }
}
