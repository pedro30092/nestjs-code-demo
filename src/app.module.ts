import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TuitModule } from './modules/tuit/tuit.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TuitModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'tuiter',
    autoLoadEntities: true,
    synchronize: true
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
