// ** Nest Imports
import { Controller, Post, Body, UseGuards } from '@nestjs/common';

// ** Module Imports
import AuthService from '../service/auth.service';

// ** Swagger Imports
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

// ** Response Imports
import { AuthResponse } from '../../../response/auth.response';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** enum, dto, entity, types Imports
import RequestDiceUserLoginDto from '../dto/user.login.dto';
import RequestDiceUserSaveDto from '../dto/user.save.dto';
import RequestUserReissueDto from '../dto/user.reissue.dto';
import User from '../../user/domain/user.entity';
import RequestUserLoginDto from '../dto/user.login.dto';
import RequestUserSaveDto from '../dto/user.save.dto';

// ** Utils Imports
import JwtRefreshGuard from '../passport/auth.jwt-refresh.guard';
import { GetUser } from '../../../decorators/user.decorators';

@ApiTags('Auth')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/auth', version: '1' })
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '유저 로그인' })
  @ApiBody({ type: RequestDiceUserLoginDto })
  @ApiResponse(AuthResponse.loginUser[200])
  @ApiResponse(AuthResponse.loginUser[400])
  @ApiResponse(AuthResponse.loginUser[404])
  @Post('/')
  public async loginDiceUser(@Body() dto: RequestUserLoginDto) {
    return await this.authService.login(dto);
  }

  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: RequestDiceUserSaveDto })
  @ApiResponse(AuthResponse.saveUser[200])
  @ApiResponse(AuthResponse.saveUser[400])
  @Post('/user')
  public async saveDiceUser(@Body() dto: RequestUserSaveDto) {
    return await this.authService.saveUser(dto);
  }

  @ApiOperation({ summary: '유저 토큰 재발급' })
  @ApiBody({ type: RequestUserReissueDto })
  @UseGuards(JwtRefreshGuard)
  @ApiResponse(AuthResponse.reissueToken[200])
  @ApiResponse(createUnauthorizedResponse())
  @Post('/reissue')
  public async reissueToken(@GetUser() user: User) {
    return await this.authService.reissueToken(user);
  }
}
