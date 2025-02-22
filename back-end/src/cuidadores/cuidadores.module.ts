// src/cuidadores/cuidadores.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuidador } from '../cuidadores/entity/cuidadores.entity';
import { CuidadoresService } from './cuidadores.service';
import { CuidadoresController } from './cuidadores.controller';
import { Categoria } from 'src/categoria/entity/categoria.entity';
import { Resena } from 'src/resena/entity/resena.entity';
import { DiaSemana } from './entity/diasemana.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuidador, Categoria, Resena, DiaSemana])],
  providers: [CuidadoresService],
  controllers: [CuidadoresController],
  exports: [CuidadoresService],
})
export class CuidadoresModule {}
