// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import { UserRole } from '../../../common/enum/user.role';

@Entity({ name: 'TB_USER' })
@Unique(['username'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '유저 id',
    nullable: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '비밀번호',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    comment: '역할',
    nullable: false,
  })
  role: UserRole;
}
