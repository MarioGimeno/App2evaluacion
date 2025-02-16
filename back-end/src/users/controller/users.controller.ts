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
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOne(id);
    }
  
    @Post()
    create(@Body() payload: CreateUserDto) {
      return this.usersService.create(payload);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() payload: UpdateUserDto,
    ) {
      return this.usersService.update(id, payload);
    }
  }
  