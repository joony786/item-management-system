import { Item } from '../entities/item.entity';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';

/**
 * Interface for Items Service
 * Defines the contract for item-related operations
 */
export interface IItemsService {
  /**
   * Creates a new item
   * @param createItemDto - The item data to create
   * @returns Promise<Item> - The created item
   */
  create(createItemDto: CreateItemDto): Promise<Item>;

  /**
   * Retrieves all items with pagination and filtering
   * @param paginationDto - Pagination and filter parameters
   * @returns Promise<PaginatedResponseDto<Item>> - Paginated items response
   */
  findAll(paginationDto: PaginationDto): Promise<PaginatedResponseDto<Item>>;

  /**
   * Retrieves a single item by ID
   * @param id - The item ID
   * @returns Promise<Item> - The found item
   */
  findOne(id: string): Promise<Item>;

  /**
   * Updates an existing item
   * @param id - The item ID
   * @param updateItemDto - The update data
   * @returns Promise<Item> - The updated item
   */
  update(id: string, updateItemDto: UpdateItemDto): Promise<Item>;

  /**
   * Removes an item
   * @param id - The item ID
   * @returns Promise<void>
   */
  remove(id: string): Promise<void>;

  /**
   * Retrieves all unique categories
   * @returns Promise<string[]> - Array of category names
   */
  getCategories(): Promise<string[]>;

  /**
   * Retrieves item statistics
   * @returns Promise<object> - Statistics object
   */
  getStats(): Promise<{
    totalItems: number;
    activeItems: number;
    totalValue: number;
    categories: number;
  }>;
}
