import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './services/items.service';
import { ItemsController } from './controllers/items.controller';
import { Item } from './entities/item.entity';
import { IItemsService } from './interfaces/items-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    {
      provide: 'IItemsService',
      useClass: ItemsService,
    },
  ],
  exports: [ItemsService, 'IItemsService'],
})
export class ItemsModule {}
