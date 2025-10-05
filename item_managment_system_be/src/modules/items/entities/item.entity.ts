import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ItemStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISCONTINUED = 'discontinued',
}

@Entity('items')
@Index(['title']) // Index for search optimization
@Index(['category'])
@Index(['status'])
@Index(['createdAt'])
@Index(['price'])
export class Item {
  @ApiProperty({ description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Item title', maxLength: 255 })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'Item description', required: false })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ description: 'Item category', maxLength: 100 })
  @Column({ type: 'varchar', length: 100 })
  category: string;

  @ApiProperty({ description: 'Item price', minimum: 0 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'Item quantity', minimum: 0 })
  @Column({ type: 'int', default: 0 })
  quantity: number;

  @ApiProperty({ description: 'Item tags', type: [String], required: false })
  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @ApiProperty({ enum: ItemStatus, description: 'Item status' })
  @Column({
    type: 'enum',
    enum: ItemStatus,
    default: ItemStatus.ACTIVE,
  })
  status: ItemStatus;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
