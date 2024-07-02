import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  @IsOptional()
  cursor?: string;

  @Field({ nullable: true, defaultValue: 10 })
  @IsOptional()
  limit?: number;
}
