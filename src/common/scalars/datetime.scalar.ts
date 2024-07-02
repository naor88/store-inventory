import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime')
export class DateTimeScalar implements CustomScalar<Date, string> {
  description = 'DateTime custom scalar type';

  parseValue(value: Date): string {
    return value.toISOString(); // value from the client
  }

  serialize(value: string): Date {
    return new Date(value);
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  }
}
