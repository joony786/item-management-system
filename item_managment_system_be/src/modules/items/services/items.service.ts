import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item, ItemStatus } from '../entities/item.entity';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { PaginationDto, ItemSortBy, SortOrder } from '../../../common/dto/pagination.dto';
import { PaginatedResponseDto, PaginationMetaDto } from '../../../common/dto/paginated-response.dto';
import { IItemsService } from '../interfaces/items-service.interface';
import { APP_CONSTANTS, DB_ERROR_CODES } from '../../../common/constants/app.constants';
import {
  ItemNotFoundException,
  ItemAlreadyExistsException,
  ItemOperationException,
  ItemValidationException,
} from '../../../common/exceptions/item.exceptions';

/**
 * Service for managing items
 * Provides CRUD operations and business logic for items
 */
@Injectable()
export class ItemsService implements IItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  /**
   * Creates a new item in the system
   * @param createItemDto - The item data to create
   * @returns Promise<Item> - The created item
   * @throws {ItemAlreadyExistsException} When item with same title exists
   * @throws {ItemOperationException} When item creation fails
   */
  async create(createItemDto: CreateItemDto): Promise<Item> {
    this.logger.log(`Creating new item: ${createItemDto.title}`);
    
    try {
      // Check if item with same title already exists
      const existingItem = await this.itemsRepository.findOne({
        where: { title: createItemDto.title },
      });
      
      if (existingItem) {
        throw new ItemAlreadyExistsException(createItemDto.title);
      }

      const item = this.itemsRepository.create(createItemDto);
      const savedItem = await this.itemsRepository.save(item);
      
      this.logger.log(`Item created successfully with ID: ${savedItem.id}`);
      return savedItem;
    } catch (error) {
      if (error instanceof ItemAlreadyExistsException) {
        throw error;
      }
      
      // Handle database constraint violations
      if (error.code === DB_ERROR_CODES.UNIQUE_VIOLATION) {
        throw new ItemAlreadyExistsException(createItemDto.title);
      }
      
      this.logger.error(`Failed to create item: ${error.message}`, error.stack);
      throw new ItemOperationException('create item', error.message);
    }
  }

  /**
   * Retrieves all items with pagination and filtering
   * @param paginationDto - Pagination and filter parameters
   * @returns Promise<PaginatedResponseDto<Item>> - Paginated items response
   * @throws {ItemValidationException} When pagination parameters are invalid
   */
  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponseDto<Item>> {
    this.logger.log('Retrieving items with pagination and filters');
    
    // Validate pagination parameters
    this.validatePaginationParams(paginationDto);
    
    const { 
      page = APP_CONSTANTS.DEFAULT_PAGE, 
      limit = APP_CONSTANTS.DEFAULT_LIMIT, 
      search, 
      category, 
      status, 
      sortBy, 
      sortOrder 
    } = paginationDto;
    
    const skip = (page - 1) * limit;

    // Build query
    const queryBuilder = this.itemsRepository.createQueryBuilder('item');

    // Apply filters
    if (search) {
      queryBuilder.andWhere(
        '(LOWER(item.title) LIKE LOWER(:search) OR LOWER(item.description) LIKE LOWER(:search))',
        { search: `${APP_CONSTANTS.SEARCH_WILDCARD}${search}${APP_CONSTANTS.SEARCH_WILDCARD}` }
      );
    }

    if (category) {
      queryBuilder.andWhere('item.category = :category', { category });
    }

    if (status) {
      queryBuilder.andWhere('item.status = :status', { status });
    }

    // Apply sorting
    const orderDirection = sortOrder === SortOrder.ASC ? 'ASC' : 'DESC';
    switch (sortBy) {
      case ItemSortBy.TITLE:
        queryBuilder.orderBy('item.title', orderDirection);
        break;
      case ItemSortBy.PRICE:
        queryBuilder.orderBy('item.price', orderDirection);
        break;
      case ItemSortBy.CREATED_AT:
      default:
        queryBuilder.orderBy('item.createdAt', orderDirection);
        break;
    }

    // Get total count
    const totalItems = await queryBuilder.getCount();

    // Apply pagination
    queryBuilder.skip(skip).take(limit);

    // Execute query
    const items = await queryBuilder.getMany();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / limit);
    const pagination: PaginationMetaDto = {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    this.logger.log(`Retrieved ${items.length} items out of ${totalItems} total`);
    return new PaginatedResponseDto(items, pagination);
  }

  /**
   * Retrieves a single item by ID
   * @param id - The item ID
   * @returns Promise<Item> - The found item
   * @throws {ItemNotFoundException} When item is not found
   */
  async findOne(id: string): Promise<Item> {
    this.logger.log(`Retrieving item with ID: ${id}`);
    
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      this.logger.warn(`Item not found with ID: ${id}`);
      throw new ItemNotFoundException(id);
    }
    
    this.logger.log(`Item found: ${item.title}`);
    return item;
  }

  /**
   * Updates an existing item
   * @param id - The item ID
   * @param updateItemDto - The update data
   * @returns Promise<Item> - The updated item
   * @throws {ItemNotFoundException} When item is not found
   * @throws {ItemOperationException} When update fails
   */
  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    this.logger.log(`Updating item with ID: ${id}`);
    
    const item = await this.findOne(id);
    
    try {
      // Check for title conflicts if title is being updated
      if (updateItemDto.title && updateItemDto.title !== item.title) {
        const existingItem = await this.itemsRepository.findOne({
          where: { title: updateItemDto.title },
        });
        
        if (existingItem) {
          throw new ItemAlreadyExistsException(updateItemDto.title);
        }
      }
      
      Object.assign(item, updateItemDto);
      const updatedItem = await this.itemsRepository.save(item);
      
      this.logger.log(`Item updated successfully: ${updatedItem.title}`);
      return updatedItem;
    } catch (error) {
      if (error instanceof ItemAlreadyExistsException) {
        throw error;
      }
      
      if (error.code === DB_ERROR_CODES.UNIQUE_VIOLATION) {
        throw new ItemAlreadyExistsException(updateItemDto.title || item.title);
      }
      
      this.logger.error(`Failed to update item: ${error.message}`, error.stack);
      throw new ItemOperationException('update item', error.message);
    }
  }

  /**
   * Removes an item from the system
   * @param id - The item ID
   * @returns Promise<void>
   * @throws {ItemNotFoundException} When item is not found
   * @throws {ItemOperationException} When deletion fails
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`Removing item with ID: ${id}`);
    
    const item = await this.findOne(id);
    
    try {
      await this.itemsRepository.remove(item);
      this.logger.log(`Item removed successfully: ${item.title}`);
    } catch (error) {
      this.logger.error(`Failed to remove item: ${error.message}`, error.stack);
      throw new ItemOperationException('remove item', error.message);
    }
  }

  /**
   * Retrieves all unique categories from items
   * @returns Promise<string[]> - Array of category names
   */
  async getCategories(): Promise<string[]> {
    this.logger.log('Retrieving all categories');
    
    const categories = await this.itemsRepository
      .createQueryBuilder('item')
      .select('DISTINCT item.category', 'category')
      .orderBy('item.category', 'ASC')
      .getRawMany();
    
    const categoryList = categories.map(cat => cat.category);
    this.logger.log(`Retrieved ${categoryList.length} categories`);
    
    return categoryList;
  }

  /**
   * Retrieves comprehensive statistics about items
   * @returns Promise<object> - Statistics object containing totals and counts
   */
  async getStats(): Promise<{
    totalItems: number;
    activeItems: number;
    totalValue: number;
    categories: number;
  }> {
    this.logger.log('Retrieving item statistics');
    
    const [totalItems, activeItems, totalValue, categories] = await Promise.all([
      this.itemsRepository.count(),
      this.itemsRepository.count({ where: { status: ItemStatus.ACTIVE } }),
      this.itemsRepository
        .createQueryBuilder('item')
        .select('SUM(item.price * item.quantity)', 'totalValue')
        .getRawOne(),
      this.itemsRepository
        .createQueryBuilder('item')
        .select('COUNT(DISTINCT item.category)', 'categories')
        .getRawOne(),
    ]);

    const stats = {
      totalItems,
      activeItems,
      totalValue: parseFloat(totalValue.totalValue) || 0,
      categories: parseInt(categories.categories) || 0,
    };
    
    this.logger.log('Statistics retrieved successfully', stats);
    return stats;
  }

  /**
   * Validates pagination parameters
   * @private
   * @param paginationDto - Pagination parameters to validate
   * @throws {ItemValidationException} When parameters are invalid
   */
  private validatePaginationParams(paginationDto: PaginationDto): void {
    const errors: string[] = [];
    
    if (paginationDto.limit && paginationDto.limit > APP_CONSTANTS.MAX_LIMIT) {
      errors.push(APP_CONSTANTS.ERROR_MESSAGES.INVALID_PAGINATION_LIMIT);
    }
    
    if (paginationDto.page && paginationDto.page < 1) {
      errors.push(APP_CONSTANTS.ERROR_MESSAGES.INVALID_PAGINATION_PAGE);
    }
    
    if (errors.length > 0) {
      throw new ItemValidationException('Invalid pagination parameters', errors);
    }
  }
}