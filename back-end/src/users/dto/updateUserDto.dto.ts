// src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../dto/createUserDto.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
