import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterInput {
  @Field({ nullable: false })
  query: string;
}
