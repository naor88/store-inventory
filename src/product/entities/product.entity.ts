import { Field, ObjectType, Float } from '@nestjs/graphql';
import { DateTimeScalar } from '../../common/scalars/datetime.scalar';

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  quantity: number;

  @Field()
  sold: number;

  @Field()
  pending_orders: number;

  @Field({ defaultValue: false })
  deleted: boolean;

  @Field(() => DateTimeScalar)
  created_at: Date;

  @Field(() => DateTimeScalar)
  updated_at: Date;
}
