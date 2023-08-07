import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class TodoResponseDto {
  @ApiProperty({ type: [TodoDto] })
  data: TodoDto[];

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  totalRecords: number;
}
