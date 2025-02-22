// src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
