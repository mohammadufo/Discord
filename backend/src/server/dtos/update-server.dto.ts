import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateServerDto {
  @IsString()
  @Field()
  name: string;

  @Field({ nullable: true })
  serverId: number;
}
