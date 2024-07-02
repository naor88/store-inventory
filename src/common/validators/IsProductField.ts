import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const validProductFields = [
  'id',
  'name',
  'description',
  'price',
  'quantity',
  'sold',
  'pending_orders',
  'created_at',
  'updated_at',
];

@ValidatorConstraint({ async: false })
export class IsProductFieldConstraint implements ValidatorConstraintInterface {
  validate(field: any) {
    return typeof field === 'string' && validProductFields.includes(field);
  }

  defaultMessage() {
    return 'Field ($value) is not a valid product attribute!';
  }
}

export function IsProductField(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsProductFieldConstraint,
    });
  };
}
