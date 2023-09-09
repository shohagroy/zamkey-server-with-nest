import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  icon?: {
    id: string;
    url: string;
  };

  @ApiProperty()
  category: string;
}
