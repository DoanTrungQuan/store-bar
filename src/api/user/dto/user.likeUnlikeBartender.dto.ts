// ** Swagger Imports
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export default class LikeUnlikeBartenderDto {
  @ApiPropertyOptional({ example: '7f8c87e1-f5d3-4c7f-92ea-897ec57a2bb4' })
  @IsUUID()
  bartenderId?: string;

}
