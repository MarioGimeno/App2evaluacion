// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entity/users.entity';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../service/users.service';
import { Rol } from '../../roles/entity/roles.entity';
import { Contratacion } from 'src/contrataciones/entity/contrataciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Contratacion])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // si quieres usar el servicio/entidad en otros módulos
})
export class UsersModule {}
