// src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUserDto.dto';
import { UpdateUserDto } from '../dto/updateUserDto.dto';

/**
 * Decorador @Injectable() indica que esta clase puede ser inyectada como dependencia.
 */
@Injectable()
export class UsersService {
  
}
