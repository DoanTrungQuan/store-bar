// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../../user/repository/user.repository';

// ** Utils Imports
import * as bcrypt from 'bcryptjs';

// ** enum, dto, entity, types Imports
import { JwtPayload } from '../../../type';
import CommonResponse from '../../../common/dto/api.response';
import RequestDiceUserLoginDto from '../dto/user.login.dto';
import RequestDiceUserSaveDto from '../dto/user.save.dto';
import User from '../../../api/user/domain/user.entity';
import { UserRole } from '../../../common/enum/user.role';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private logger = new Logger();

  public async login(dto: RequestDiceUserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!findUser) {
      return CommonResponse.createNotFoundException('유저를 찾을 수 없습니다.');
    }

    const result = await bcrypt.compare(dto.password, findUser.password);

    if (!result) {
      return CommonResponse.createBadRequestException(
        '비밀번호가 맞지 않습니다.',
      );
    }

    const token = this.generateToken({ id: findUser.id });

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '로그인에 성공했습니다.',
      data: {
        token,
        user: {
          email: findUser.username,
          role: findUser.role,
        },
      },
    });
  }

  public async saveUser(dto: RequestDiceUserSaveDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (findUser) {
      return CommonResponse.createBadRequestException(
        '이미 회원가입한 유저 입니다.',
      );
    }

    const hash = await bcrypt.hash(dto.password, 10);

    await this.userRepository.save(
      this.userRepository.create({
        username: dto.username,
        password: hash,
        role: UserRole.USER,
      }),
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '회원가입 했습니다.',
    });
  }

  public async reissueToken(user: User) {
    const accessToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    );
    return CommonResponse.createResponse({
      statusCode: 200,
      message: '토큰을 재발급합니다.',
      data: { accessToken },
    });
  }

  public generateToken(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      }),
    };
  }

  public async findUserByJwt({ id }: JwtPayload): Promise<any> {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      return CommonResponse.createNotFoundException('유저를 찾을 수 없습니다.');
    }
    return findUser;
  }

  public async findRefreshToken({ id }: JwtPayload) {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async loginKakaotalk() {
    return {msg: "Login kakaotalk"}
  }

  public async loginKakaotalkCallback(code: string) {
    return {msg: "Login kakaotalk callback with code: " + code}
  }

  public async logout(refreshToken: string) {
    return {msg: "Logout for refreshToken: " + refreshToken}
  }
}
