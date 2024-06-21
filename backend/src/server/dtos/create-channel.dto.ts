import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';
import { ChannelType } from '../types';

@InputType()
export class CreateChannelOnServerDto {
  @IsString()
  @Field()
  name: string;

  @IsInt()
  @Field({ nullable: true })
  serverId: number;

  @IsString()
  @Field()
  type: ChannelType;
}
