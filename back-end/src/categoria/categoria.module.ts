// src/categoria/categoria.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entity/categoria.entity';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [CategoriaService],
})
export class CategoriaModule {}
