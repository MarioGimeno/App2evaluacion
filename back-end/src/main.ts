// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita la validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina propiedades que no estén en el DTO
    forbidNonWhitelisted: true, // lanza error si hay propiedades desconocidas
    transform: true, // transforma la payload a la clase DTO
  }));

  await app.listen(3000);
}
bootstrap();
