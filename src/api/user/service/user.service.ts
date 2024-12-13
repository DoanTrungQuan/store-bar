// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';

// ** enum, dto, entity, types Imports

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async getTermsOfUse() {
    return {msg: "get terms of use"}
  }

  public async getPrivacyPolicy() {
    return {msg: "get privacy policy"}
  }

  public async settingProfile(dto) {
    return {msg: "setting bartender"+dto}
  }

  public async getFavoriteBartenderList() {
    return {msg: "get favorite bartender list"}
  }

  public async likeUnlikeBartender(bartenderId) {
    return {msg: "like unlike bartender"+ bartenderId}
  }
}
