import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entity/users.entity';
import { CreateUserDto } from '../dto/createUserDto.dto';
import { UpdateUserDto } from '../dto/updateUserDto.dto';
import { uploadFileWithoutCredentials } from 'src/utils/uploadBucket.utils';


@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(Usuario)
    private userRepo: Repository<Usuario>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      this.logger.warn(`User #${id} not found`);
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);
    return this.userRepo.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, payload);
    return this.userRepo.save(user);
  }

  /**
   * Registra al usuario. Primero sube la imagen y luego inserta al usuario en la BD.
   */
  async register(
    file: Express.Multer.File,
    createUserDto: CreateUserDto,
  ): Promise<Usuario> {
    // Genera una key única para el archivo
    const key = `users/${Date.now()}_${file.originalname}`;
    this.logger.log(`Generando key para el archivo: ${key}`);

    // Sube la imagen y obtiene la URL
    this.logger.log('Iniciando subida de imagen al bucket...');
    const imageUrl = await uploadFileWithoutCredentials(
      file.buffer,
      key,
      file.mimetype,
    );
    this.logger.log(`Imagen subida exitosamente, URL: ${imageUrl}`);

    // Crea el objeto de usuario combinando los datos y la URL de la imagen
    const newUser = this.userRepo.create({
      ...createUserDto,
      imageUrl,
    });
    this.logger.log(`Creando usuario con datos: ${JSON.stringify({ ...createUserDto, imageUrl })}`);

    // Inserta en la base de datos
    try {
      const savedUser = await this.userRepo.save(newUser);
      this.logger.log(`Usuario registrado exitosamente: ${JSON.stringify(savedUser)}`);
      return savedUser;
    } catch (error) {
      this.logger.error('Error al registrar usuario', error.stack);
      throw new InternalServerErrorException('Error al registrar usuario');
    }
  }

  async login(email: string, password: string): Promise<Usuario> {
    const user = await this.userRepo.findOne({ where: { email, password } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }
  
}
