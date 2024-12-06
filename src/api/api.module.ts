// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class ApiModule {}
