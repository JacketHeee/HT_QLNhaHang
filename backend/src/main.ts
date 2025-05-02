import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Cấu hình validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Cấu hình exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Cấu hình CORS
  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
  });
  
  // Lấy cấu hình từ ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;
  
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();