import { UserRole } from '../common/enum/user.role';
import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const BartenderResponse = {
  getHashtagsList: {
    200: createResponse({
      data: ["#hashtag01", "#hashtag02", "#hashtag03", "#hashtag04"],
      statusCode: 200,
      message: '성공한 바텐더를 위한 해시태그 목록을 받아보세요.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '현재 바리스타에 대한 해시태그가 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  settingProfileBartender: {
    200: createResponse({
      data: {
        nickname: 'inhoo987654321@gmail.com',
        fullname: "the shy",
        phoneNumber: "0123456789",
        profileUrl: "https://profile_url",
        createdAt: "dd/mm/yyyy",
        updatedAt: "dd/mm/yyyy",
        hashTags: ["#hashtag01", "#hashtag03"],
        photos: ["img1.png", "img2.png"]
      },
      statusCode: 200,
      message: '프로필 설정 성공.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '프로필 설정에 실패했습니다. 데이터가 유효하지 않습니다.',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '유저를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
