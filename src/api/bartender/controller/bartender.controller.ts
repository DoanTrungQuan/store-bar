// ** Nest Imports
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

// ** Module Imports
import BartenderService from '../service/bartender.service';

// ** Swagger Imports
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

import {
    createServerExceptionResponse,
    createUnauthorizedResponse,
} from '../../../response/common';
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { BartenderResponse } from '../../../response/bartender.response';

// ** Dto Imports
import SettingProfileBartenderDto from '../dto/bartender.settingProfile.dto';

@ApiTags('Bartender')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/bartender', version: '1' })
export default class BartenderController {
    constructor(private readonly bartenderService: BartenderService) { }

    @ApiOperation({ summary: '바텐더를 위한 해시태그를 꺼내보세요 - coming soon' })
    @UseGuards(JwtAccessGuard)
    @ApiResponse(BartenderResponse.getHashtagsList[200])
    @ApiResponse(BartenderResponse.getHashtagsList[404])
    @Get('/hashtags')
    public async getHashtagForBartender() {
        return await this.bartenderService.getHashtags();
    }

    @ApiOperation({ summary: '바텐더 프로필 설정 - coming soon' })
    @UseGuards(JwtAccessGuard)
    @ApiBody({ type: SettingProfileBartenderDto })
    @ApiResponse(BartenderResponse.settingProfileBartender[200])
    @ApiResponse(BartenderResponse.settingProfileBartender[400])
    @ApiResponse(BartenderResponse.settingProfileBartender[404])
    @Patch('/setting-profile')
    public async settingProfile(@Body() dto: SettingProfileBartenderDto) {
        return await this.bartenderService.settingProfile(dto);
    }
}