// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/createUserDto.dto';
import { UpdateUserDto } from '../dto/updateUserDto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Usuario } from '../entity/users.entity';
import { LoginDto } from '../dto/loginDto.dto';

@Controller('usuarios')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    this.logger.log('Obteniendo todos los usuarios');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Obteniendo usuario #${id}`);
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    this.logger.log('Creando nuevo usuario');
    return this.usersService.create(payload);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    this.logger.log(`Actualizando usuario #${id}`);
    return this.usersService.update(id, payload);
  }

  /**
   * Registra al usuario. Primero sube la imagen y luego inserta al usuario en la BD.
   */
  @Post('registro')
  @UseInterceptors(FileInterceptor('image'))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Usuario> {
    this.logger.log('Iniciando proceso de registro de usuario');
    const user = await this.usersService.register(file, createUserDto);
    this.logger.log('Proceso de registro finalizado');
    return user;
  }

  // Método de login usando solo email y password
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Usuario> {
    const user = await this.usersService.login(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }
}
