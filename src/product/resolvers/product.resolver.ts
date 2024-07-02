import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import {
  CreateProductInput,
  UpdateProductInput,
  PaginatedProducts,
  PaginationInput,
  SortingInput,
  Order,
} from '../dto';
import { FilterInput } from '../dto/filter.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => PaginatedProducts)
  async findPaginatedProducts(
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
    @Args('sortingInput', { type: () => SortingInput, nullable: true })
    sortingInput?: SortingInput,
    @Args('filterInput', { type: () => FilterInput, nullable: true })
    filterInput?: FilterInput,
  ): Promise<PaginatedProducts> {
    // Set default values if arguments are not provided
    const defaultPaginationInput: PaginationInput = { cursor: null, limit: 10 };
    const defaultSortingInput: SortingInput = {
      field: 'created_at',
      order: Order.DESC,
    };

    const effectivePaginationInput = paginationInput
      ? {
          cursor: paginationInput.cursor ?? defaultPaginationInput.cursor,
          limit: paginationInput.limit ?? defaultPaginationInput.limit,
        }
      : defaultPaginationInput;

    const effectiveSortingInput = sortingInput
      ? {
          field: sortingInput.field ?? defaultSortingInput.field,
          order: sortingInput.order ?? defaultSortingInput.order,
        }
      : defaultSortingInput;

    return this.productService.findPaginated(
      effectivePaginationInput,
      effectiveSortingInput,
      filterInput,
    );
  }

  @Query(() => Product)
  product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(updateProductInput);
  }

  @Mutation(() => Boolean)
  removeProduct(@Args('id') id: string) {
    return this.productService.remove(id);
  }

  @Query(() => [Product])
  async findLowStock(
    @Args('threshold', { type: () => Number, defaultValue: 10 })
    threshold: number,
  ): Promise<Product[]> {
    return this.productService.findLowStock(threshold);
  }

  @Query(() => [Product])
  mostPopularProducts(
    @Args('top_x_items', { type: () => Number, defaultValue: 3 })
    top_x_items: number,
  ) {
    return this.productService.findMostPopular(top_x_items);
  }
}
