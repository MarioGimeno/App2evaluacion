// src/resenas/resena.service.ts
import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resena } from './entity/resena.entity';
import { ResenaCreateDTO } from './dto/create-resena.dto';
import { Cuidador } from '../cuidadores/entity/cuidadores.entity';
import { Usuario } from 'src/users/entity/users.entity';

@Injectable()
export class ResenaService {
  private readonly logger = new Logger(ResenaService.name);

  constructor(
    @InjectRepository(Resena)
    private readonly resenaRepo: Repository<Resena>,
    @InjectRepository(Cuidador)
    private readonly cuidadorRepo: Repository<Cuidador>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Resena[]> {
    try {
      return await this.resenaRepo.find({ relations: ['cuidador', 'usuario'] });
    } catch (error) {
      this.logger.error('Error obteniendo reseñas', error.stack);
      throw new InternalServerErrorException('Error obteniendo reseñas');
    }
  }

  async findOne(id: number): Promise<Resena> {
    const resena = await this.resenaRepo.findOne({ where: { id }, relations: ['cuidador', 'usuario'] });
    if (!resena) {
      this.logger.warn(`Reseña #${id} no encontrada`);
      throw new NotFoundException(`Reseña #${id} no encontrada`);
    }
    return resena;
  }
  async create(payload: ResenaCreateDTO): Promise<Resena> {
    // Busca el cuidador
    const cuidador = await this.cuidadorRepo.findOneBy({ id: payload.cuidadorId });
    if (!cuidador) {
      throw new NotFoundException(`Cuidador #${payload.cuidadorId} no encontrado`);
    }
    // Busca el usuario
    const usuario = await this.usuarioRepo.findOneBy({ id: payload.usuarioId });
    if (!usuario) {
      throw new NotFoundException(`Usuario #${payload.usuarioId} no encontrado`);
    }
    const newResena = this.resenaRepo.create({
      comentario: payload.comentario,
      calificacion: payload.calificacion,
      cuidador, // Asocia el cuidador
      usuario,  // Asocia el usuario que deja la reseña
    });
    try {
      const savedResena = await this.resenaRepo.save(newResena);
      this.logger.log(`Reseña creada exitosamente: ${JSON.stringify(savedResena)}`);
      return savedResena;
    } catch (error) {
      this.logger.error('Error creando reseña', error.stack);
      throw new InternalServerErrorException('Error creando reseña');
    }
  }
  
  // Método para obtener las reseñas por cuidador
  async findByCuidador(cuidadorId: number): Promise<Resena[]> {
    const resenas = await this.resenaRepo.find({
      where: { 
        cuidador: { id: cuidadorId },
      },
      relations: ['usuario', 'cuidador'], // Esto incluye las relaciones si las necesitas
    });

    if (!resenas || resenas.length === 0) {
      throw new NotFoundException(`No se encontraron reseñas para el cuidador #${cuidadorId}`);
    }
    return resenas;
  }
}
