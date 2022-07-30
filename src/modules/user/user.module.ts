import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';

@Module({
  //To use repositories inside a module, we use forFeature method to register all entities
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
