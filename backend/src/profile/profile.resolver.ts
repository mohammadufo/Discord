import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './profile.type';
import { CreateProfileDto } from './dtos/create-profile.dto';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  async create(@Args('input') input: CreateProfileDto) {
    return this.profileService.createProfile(input);
  }
}
