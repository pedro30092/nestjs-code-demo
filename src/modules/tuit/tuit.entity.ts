import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/entities';

@Entity()
export class Tuit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  //type and item parameters are functions
  @ManyToOne((type) => User, (user) => user.tuits, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
