// src/users/users.controller.ts
import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { CreateUserDto } from '../dto/createUserDto.dto';
  import { UpdateUserDto } from '../dto/updateUserDto.dto';
  
  @Controller('contrataciones')
  export class UsersController {
   
  }
  