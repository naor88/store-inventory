import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateProductInput,
  Order,
  PaginatedProducts,
  PaginationInput,
  SortingInput,
  UpdateProductInput,
} from '../dto';
import { Product } from '../entities/product.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FilterInput } from '../dto/filter.input';

@Injectable()
export class ProductService {
  private products: Product[];

  constructor() {
    const dataPath = this.getDataPath();
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Data file not found at ${dataPath}`);
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    this.products = JSON.parse(rawData);
  }

  private getDataPath(): string {
    return path.join(__dirname, '../../data/products.json');
  }

  create(createProductInput: CreateProductInput): Product {
    const existingProduct = this.products.find(
      (product) => product.name === createProductInput.name,
    );
    if (existingProduct) {
      throw new BadRequestException('Product with this name already exists');
    }

    const newProduct: Product = {
      id: uuidv4(),
      ...createProductInput,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findPaginated(
    paginationInput: PaginationInput = { cursor: null, limit: 10 },
    sortingInput: SortingInput = { field: 'created_at', order: Order.DESC },
    filterInput?: FilterInput,
  ): PaginatedProducts {
    const { cursor, limit: reqLimit } = paginationInput;
    const limit = Math.min(reqLimit, 100); // Limiting the max results to 100

    let products = this.products.filter((product) => !product.deleted);

    if (filterInput) {
      const query = filterInput.query.toLowerCase();
      if (query) {
        products = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query),
        );
      }
    }

    // Apply sorting if provided
    if (sortingInput) {
      products = products.sort((a, b) => {
        if (sortingInput.order === 'ASC') {
          return a[sortingInput.field] > b[sortingInput.field] ? 1 : -1;
        } else {
          return a[sortingInput.field] < b[sortingInput.field] ? 1 : -1;
        }
      });
    }

    let startIndex = 0;
    if (cursor) {
      const cursorIndex = products.findIndex(
        (product) => product.id === cursor,
      );
      if (cursorIndex >= 0) {
        startIndex = cursorIndex + 1;
      }
    }

    const paginatedProducts = products.slice(startIndex, startIndex + limit);
    const nextCursor =
      paginatedProducts.length === limit
        ? paginatedProducts[paginatedProducts.length - 1].id
        : null;

    return {
      products: paginatedProducts,
      nextCursor,
    };
  }

  findOne(id: string): Product {
    const product = this.products.find(
      (product) => product.id === id && !product.deleted,
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  update(updateProductInput: UpdateProductInput): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === updateProductInput.id,
    );
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    const existingProduct = this.products.find(
      (product) =>
        product.name === updateProductInput.name &&
        product.id !== updateProductInput.id,
    );
    if (existingProduct) {
      throw new BadRequestException('Product with this name already exists');
    }

    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductInput,
      updated_at: new Date(),
    };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  remove(id: string): boolean {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    if (this.products[productIndex].pending_orders > 0) {
      throw new BadRequestException(
        'Cannot delete product with pending orders',
      );
    }

    // soft delete for better tracking
    this.products[productIndex].deleted = true;
    return true;
  }

  findLowStock(threshold: number = 10): Product[] {
    return this.products.filter((product) => product.quantity < threshold);
  }

  findMostPopular(top_x_items: number = 3): Product[] {
    return this.products.sort((a, b) => b.sold - a.sold).slice(0, top_x_items);
  }
}
