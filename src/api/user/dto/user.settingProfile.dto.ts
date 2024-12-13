// ** Swagger Imports
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ** Pipe Imports
import { IsArray, IsOptional, IsString } from 'class-validator';

export default class SettingProfileDto {
  @ApiPropertyOptional({ example: 'nicknam123' })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional({ example: 'the shy' })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiPropertyOptional({ example: '0123456789' })
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiPropertyOptional({ example: 'https://profile_link' })
  @IsString()
  @IsOptional()
  profile_url?: string;

  @ApiPropertyOptional({ example: '["#hashtag01", "#hashtag03"]' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  hashtags?: string[];

  @ApiPropertyOptional({ example: '["photo01.png", "photo02.png"]' })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  photo?: string[];
}
