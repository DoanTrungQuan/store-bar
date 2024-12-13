// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import BartenderModule from './bartender/bartender.module';

@Module({
  imports: [AuthModule, UserModule, BartenderModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class ApiModule {}
