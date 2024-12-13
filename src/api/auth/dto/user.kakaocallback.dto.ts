// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

// ** Pipe Imports
import { IsString } from 'class-validator';

export default class KakaoCallbackDto {
  @ApiProperty({ example: 'basdjhasdlasdkalsdaksklsadaasdlkasdlkalskdalklksda' })
  @IsString()
  code: string;

}
