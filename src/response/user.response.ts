import { UserRole } from '../common/enum/user.role';
import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const UserResponse = {
  settingProfile: {
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
  getListFavoriteBartender: {
    200: createResponse({
      data: [
        {
          nickname: 'bartenderNumber01',
          fullname: "the shy",
          phoneNumber: "0123456789",
          hashTags: ["#hashtag01", "#hashtag03"],
          photos: ["img1.png", "img2.png"]
        },
        {
          nickname: 'bartenderNumber02',
          fullname: "Sun line",
          phoneNumber: "0123459999",
          hashTags: ["#hashtag01", "#hashtag02"],
          photos: ["img3.png", "img4.png"]
        }
      ],
      statusCode: 200,
      message: '좋아하는 바텐더 목록을 성공적으로 얻으세요.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '아직 마음에 드는 바텐더가 없어요.',
      error: 'NOT FOUND',
    }),
  },

  likeUnlikeBartender: {
    200: createResponse({
      data: {},
      statusCode: 200,
      message: '바텐더에 좋아요 표시/좋아요 표시 취소를 완료했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '이 바텐더를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
};
