// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
// import UserRepository from '../repository/user.repository';

// ** enum, dto, entity, types Imports

@Injectable()
export default class BartenderService {
  constructor(
    // private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async getHashtags() {
    return {msg: "get hashtags for bartender"}
  }

  public async settingProfile(dto) {
    return {msg: "setting profile for bartender"+dto}
  }

}
