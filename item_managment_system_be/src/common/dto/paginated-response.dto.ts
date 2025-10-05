import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPrevPage: boolean;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty()
  pagination: PaginationMetaDto;

  constructor(data: T[], pagination: PaginationMetaDto) {
    this.data = data;
    this.pagination = pagination;
  }
}
