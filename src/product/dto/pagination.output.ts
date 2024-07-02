import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class PaginatedProducts {
  @Field(() => [Product])
  products: Product[];

  @Field(() => String, { nullable: true })
  nextCursor?: string;
}
