// src/resenas/resena.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './entity/resena.entity';
import { Cuidador } from '../cuidadores/entity/cuidadores.entity';
import { ResenaService } from './resena.service';
import { ResenaController } from './resena.controller';
import { Usuario } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resena, Cuidador, Usuario])],
  controllers: [ResenaController],
  providers: [ResenaService],
  exports: [ResenaService],
})
export class ResenaModule {}
