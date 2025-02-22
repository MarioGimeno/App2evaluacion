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
  import { UsersService } from '../service/users.service';
  import { CreateUserDto } from '../dto/createUserDto.dto';
  import { UpdateUserDto } from '../dto/updateUserDto.dto';
  
  @Controller('roles')
  export class UsersController {
   
  }
  