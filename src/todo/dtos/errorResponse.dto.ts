import { ApiProperty } from '@nestjs/swagger';

export class TodoErrorResponseDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: string;
}
