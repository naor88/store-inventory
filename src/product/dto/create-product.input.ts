import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => Float)
  @Min(0)
  price: number;

  @Field()
  @IsInt()
  @Min(0)
  quantity: number;

  @Field()
  @IsInt()
  @Min(0)
  sold: number;

  @Field()
  @IsInt()
  @Min(0)
  pending_orders: number;
}
