import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { playgroundConfig } from './config/playground.config';
import { DateTimeScalar } from './common/scalars/datetime.scalar';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  providers: [DateTimeScalar],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground:
        process.env.NODE_ENV !== 'production' ? playgroundConfig : false,
    }),
    ProductModule,
  ],
})
export class AppModule {}
