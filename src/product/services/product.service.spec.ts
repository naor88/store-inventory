import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import {
  CreateProductInput,
  UpdateProductInput,
  PaginationInput,
  SortingInput,
  Order,
} from '../dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('ProductService', () => {
  let service: ProductService;

  const initialProducts = [
    {
      id: uuidv4(),
      name: 'Initial Product',
      description: 'Initial Product Description',
      price: 50,
      quantity: 20,
      sold: 5,
      pending_orders: 0,
      created_at: new Date(),
      updated_at: new Date(),
      deleted: false,
    },
    {
      id: uuidv4(),
      name: 'Second Product',
      description: 'Second Product Description',
      price: 100,
      quantity: 10,
      sold: 2,
      pending_orders: 0,
      created_at: new Date(),
      updated_at: new Date(),
      deleted: false,
    },
    {
      id: uuidv4(),
      name: 'Third Product',
      description: 'Third Product Description',
      price: 75,
      quantity: 15,
      sold: 3,
      pending_orders: 0,
      created_at: new Date(),
      updated_at: new Date(),
      deleted: false,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);

    // Initialize the products array directly
    service['products'] = JSON.parse(JSON.stringify(initialProducts));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new product', () => {
    const createProductInput: CreateProductInput = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      quantity: 50,
      sold: 0,
      pending_orders: 0,
    };

    const product = service.create(createProductInput);
    expect(product).toHaveProperty('id');
    expect(product.name).toBe(createProductInput.name);
    expect(product.description).toBe(createProductInput.description);
    expect(product.price).toBe(createProductInput.price);
    expect(product.quantity).toBe(createProductInput.quantity);
    expect(product.sold).toBe(createProductInput.sold);
    expect(product.pending_orders).toBe(createProductInput.pending_orders);
    expect(product.created_at).toBeInstanceOf(Date);
    expect(product.updated_at).toBeInstanceOf(Date);
  });

  it('should not create a product with duplicate name', () => {
    const createProductInput: CreateProductInput = {
      name: 'Initial Product',
      description: 'Test Description',
      price: 100,
      quantity: 50,
      sold: 0,
      pending_orders: 0,
    };

    expect(() => service.create(createProductInput)).toThrow(
      BadRequestException,
    );
  });

  it('should find paginated products using default pagination inputs', () => {
    const result = service.findPaginated();
    expect(result.products).toBeInstanceOf(Array);
    expect(result.products.length).toBe(initialProducts.length);
    expect(result.products[0].name).toBe('Third Product');
    expect(result.nextCursor).toBeNull();
  });

  it('should find a product by id', () => {
    const product = service.findOne(initialProducts[0].id);
    expect(product).toBeDefined();
    expect(product.id).toBe(initialProducts[0].id);
  });

  it('should throw an error if product not found by id', () => {
    expect(() => service.findOne('non-existent-id')).toThrow(NotFoundException);
  });

  it('should update a product', () => {
    const updateProductInput: UpdateProductInput = {
      id: initialProducts[0].id,
      name: 'Updated Test Product',
    };

    const updatedProduct = service.update(updateProductInput);
    expect(updatedProduct).toBeDefined();
    expect(updatedProduct.id).toBe(initialProducts[0].id);
    expect(updatedProduct.name).toBe(updateProductInput.name);
    expect(updatedProduct.updated_at).not.toBe(initialProducts[0].updated_at);
  });

  it('should throw an error if updating a product with a duplicate name', () => {
    const createProductInput: CreateProductInput = {
      name: 'Test Product 2',
      description: 'Test Description 2',
      price: 200,
      quantity: 30,
      sold: 10,
      pending_orders: 1,
    };

    const product2 = service.create(createProductInput);

    const updateProductInput: UpdateProductInput = {
      id: product2.id,
      name: initialProducts[0].name,
    };

    expect(() => service.update(updateProductInput)).toThrow(
      BadRequestException,
    );
  });

  it('should remove a product', () => {
    const result = service.remove(initialProducts[0].id);
    expect(result).toBe(true);
    expect(() => service.findOne(initialProducts[0].id)).toThrow(
      NotFoundException,
    );
  });

  it('should not remove a product with pending orders', () => {
    const createProductInput: CreateProductInput = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      quantity: 50,
      sold: 0,
      pending_orders: 1,
    };

    const product = service.create(createProductInput);
    expect(() => service.remove(product.id)).toThrow(BadRequestException);
  });

  it('should find low stock products', () => {
    const lowStockProducts = service.findLowStock();
    expect(lowStockProducts).toBeInstanceOf(Array);
  });

  it('should find most popular products', () => {
    const mostPopularProducts = service.findMostPopular();
    expect(mostPopularProducts).toBeInstanceOf(Array);
  });

  it('should find paginated products with sorting', () => {
    const paginationInput: PaginationInput = { cursor: null, limit: 10 };
    const sortingInput: SortingInput = { field: 'price', order: Order.ASC };
    const result = service.findPaginated(paginationInput, sortingInput);
    expect(result.products).toBeInstanceOf(Array);
    expect(result.products.length).toBe(3);
    expect(result.products[0].name).toBe('Initial Product');
    expect(result.nextCursor).toBeNull();
  });

  it('should not return deleted products in paginated list', () => {
    const createProductInput: CreateProductInput = {
      name: 'Product to be deleted',
      description: 'Product to be deleted description',
      price: 100,
      quantity: 50,
      sold: 0,
      pending_orders: 0,
    };

    const product = service.create(createProductInput);
    service.remove(product.id);

    const paginationInput: PaginationInput = { cursor: null, limit: 10 };
    const result = service.findPaginated(paginationInput);

    const deletedProduct = result.products.find((p) => p.id === product.id);
    expect(deletedProduct).toBeUndefined();
  });
});
