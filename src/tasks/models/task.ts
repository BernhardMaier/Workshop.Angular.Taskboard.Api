import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty()
  guid: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  isComplete: boolean;

  @ApiProperty()
  isInProgress: boolean;

  @ApiProperty()
  isFavorite: boolean;
}
