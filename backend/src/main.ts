import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.enableCors(); // Bật CORS
  // await app.listen(3001);

  app.enableCors({
    origin: ['https://ht-ql-nha-hang.vercel.app/', 'http://localhost:3001'], 
    methods: 'GET,POST,PUT,DELETE',
     allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });
  await app.listen(3001);
  
}
bootstrap();