import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductResolver } from './resolvers/product.resolver';

@Module({
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
