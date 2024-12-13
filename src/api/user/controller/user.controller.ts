// ** Nest Imports
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

// ** Module Imports
import UserService from '../service/user.service';

// ** Swagger Imports
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../response/common';

// ** Dto Imports
import SettingProfileDto from '../dto/user.settingProfile.dto';
import { UserResponse } from '../../../response/user.response';

import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import LikeUnlikeBartenderDto from '../dto/user.likeUnlikeBartender.dto';


@ApiTags('User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/user', version: '1' })
export default class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: '이용약관 목록 받기 - coming soon' })
  @Get('/terms-of-use')
  public async getTermsOfUse() {
    return await this.userService.getTermsOfUse();
  }

  @ApiOperation({ summary: '개인 정보 보호 정책 목록 가져오기 - coming soon' })
  @Get('/privacy-policy')
  public async getPrivacyPolicy() {
    return await this.userService.getPrivacyPolicy();
  }

  @ApiOperation({ summary: '사용자 프로필 설정 - coming soon' })
  @UseGuards(JwtAccessGuard)
  @ApiBody({ type: SettingProfileDto })
  @ApiResponse(UserResponse.settingProfile[200])
  @ApiResponse(UserResponse.settingProfile[400])
  @ApiResponse(UserResponse.settingProfile[404])
  @Patch('/setting-profile')
  public async settingProfile(@Body() dto: SettingProfileDto) {
    return await this.userService.settingProfile(dto);
  }

  @ApiOperation({ summary: '사용자가 좋아하는 바텐더 목록 가져오기 - coming soon' })
  @UseGuards(JwtAccessGuard)
  @Get('/favorite-bartender-list')
  @ApiResponse(UserResponse.getListFavoriteBartender[200])
  @ApiResponse(UserResponse.getListFavoriteBartender[404])
  public async getFavoriteBartenderList() {
    return await this.userService.getFavoriteBartenderList();
  }

  @ApiOperation({ summary: '사용자는 바텐더를 좋아하거나 좋아하지 않습니다 - coming soon' })
  @UseGuards(JwtAccessGuard)
  @ApiBody({ type: LikeUnlikeBartenderDto })
  @ApiResponse(UserResponse.likeUnlikeBartender[200])
  @ApiResponse(UserResponse.likeUnlikeBartender[404])
  @Post('/like-unlike-bartender')
  public async likeUnlikeBartender(@Body() dto: LikeUnlikeBartenderDto) {
    return await this.userService.likeUnlikeBartender(dto);
  }

}
