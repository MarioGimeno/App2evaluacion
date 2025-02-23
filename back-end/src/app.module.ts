// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/module/users.module';
import { validationSchema } from './config/validate';
import { CuidadoresModule } from './cuidadores/cuidadores.module';
import { CategoriaModule } from './categoria/categoria.module';
import config from './config/config';
import { ResenaModule } from './resena/resena.module';
import { ContractModule } from './contrataciones/module/contrataciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    DatabaseModule, // Importa aquí tu DatabaseModule
    UsersModule, CuidadoresModule, CategoriaModule, ResenaModule, ContractModule
  ],
  controllers: [],
})
export class AppModule {}
