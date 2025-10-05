import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsEnum, Min, MaxLength, IsNotEmpty } from 'class-validator';
import { ItemStatus } from '../entities/item.entity';

export class CreateItemDto {
  @ApiProperty({ description: 'Item title', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ description: 'Item description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Item category', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  category: string;

  @ApiProperty({ description: 'Item price', minimum: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Item quantity', minimum: 0 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ description: 'Item tags', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ enum: ItemStatus, description: 'Item status' })
  @IsOptional()
  @IsEnum(ItemStatus)
  status?: ItemStatus = ItemStatus.ACTIVE;
}
