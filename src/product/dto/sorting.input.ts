import { IsProductField } from '../../common/validators/IsProductField';
import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

@InputType()
export class SortingInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsProductField()
  field?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(Order)
  order?: Order;
}
