import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ItemsService } from '../services/items.service';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { Item } from '../entities/item.entity';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully', type: Item })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items with pagination and filtering' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully', type: PaginatedResponseDto })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filter by category' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter by status' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['title', 'price', 'created_at'], description: 'Sort field' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Sort order' })
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponseDto<Item>> {
    return this.itemsService.findAll(paginationDto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully', type: [String] })
  async getCategories(): Promise<string[]> {
    return this.itemsService.getCategories();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get item statistics' })
  @ApiResponse({ 
    status: 200, 
    description: 'Statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        totalItems: { type: 'number' },
        activeItems: { type: 'number' },
        totalValue: { type: 'number' },
        categories: { type: 'number' },
      },
    },
  })
  async getStats(): Promise<{
    totalItems: number;
    activeItems: number;
    totalValue: number;
    categories: number;
  }> {
    return this.itemsService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully', type: Item })
  @ApiResponse({ status: 404, description: 'Item not found' })
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item updated successfully', type: Item })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 204, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.itemsService.remove(id);
  }
}
