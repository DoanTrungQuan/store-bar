// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import BartenderController from './controller/bartender.controller';
import BartenderService from './service/bartender.service';
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';

@Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     TypeOrmExModule.forCustomRepository([UserRepository]),
//   ],
//   exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [BartenderController],
  providers: [BartenderService],
})
export default class BartenderModule {}
