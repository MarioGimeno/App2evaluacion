// src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { CreateUserDto } from '../dto/createUserDto.dto';
import { UpdateUserDto } from '../dto/updateUserDto.dto';

/**
 * Decorador @Injectable() indica que esta clase puede ser inyectada como dependencia.
 */
@Injectable()
export class UsersService {
  /**
   * Inyectamos el repositorio de la entidad User mediante el decorador @InjectRepository.
   * Esto permite acceder a los métodos de TypeORM para interactuar con la tabla "users".
   */
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  /**
   * Retorna todos los usuarios registrados.
   *
   * @returns Promise<User[]> - Una lista de usuarios.
   */
  findAll() {
    return this.userRepo.find();
  }

  /**
   * Busca y retorna un usuario según su ID.
   * Si no se encuentra, lanza una excepción NotFoundException.
   *
   * @param id - ID del usuario a buscar.
   * @returns Promise<User> - El usuario encontrado.
   * @throws NotFoundException si el usuario no existe.
   */
  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  /**
   * Crea un nuevo usuario a partir de los datos enviados en el DTO.
   *
   * @param payload - Objeto con los datos del usuario (CreateUserDto).
   * @returns Promise<User> - El usuario recién creado.
   */
  create(payload: CreateUserDto) {
    // Crea una instancia de User sin guardar en base de datos aún.
    const newUser = this.userRepo.create(payload);
    // Guarda la nueva instancia en la base de datos y la retorna.
    return this.userRepo.save(newUser);
  }

  /**
   * Actualiza los datos de un usuario existente.
   * Primero busca el usuario por ID y, si existe, lo actualiza con los datos del DTO.
   *
   * @param id - ID del usuario a actualizar.
   * @param payload - Objeto con los datos a actualizar (UpdateUserDto).
   * @returns Promise<User> - El usuario actualizado.
   */
  async update(id: number, payload: UpdateUserDto) {
    // Busca el usuario existente; si no existe, findOne lanzará NotFoundException.
    const user = await this.findOne(id);
    // Combina (merge) los nuevos datos con los existentes del usuario.
    this.userRepo.merge(user, payload);
    // Guarda y retorna el usuario actualizado.
    return this.userRepo.save(user);
  }
}
