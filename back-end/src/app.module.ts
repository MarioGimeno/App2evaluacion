// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/module/users.module';
import { ProductsModule } from './products/products.module';
import { validationSchema } from './config/validate';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    DatabaseModule, // Importa aquí tu DatabaseModule
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
