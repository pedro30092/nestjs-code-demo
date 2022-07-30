import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true, //Use transform
    whitelist: true, //Filter only properties required from body request
    forbidNonWhitelisted: true, //Throw error if extra properties are in body request
    transformOptions: {
      enableImplicitConversion: true //Transform query params into implicit value, ex. test/1?search=10, value search will transform into a number
    }
  }))

  await app.listen(3000);
}
bootstrap();
