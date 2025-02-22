// src/cuidadores/cuidadores.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuidador } from '../cuidadores/entity/cuidadores.entity';


@Injectable()
export class CuidadoresService {
  constructor(
    @InjectRepository(Cuidador)
    private readonly cuidadorRepository: Repository<Cuidador>,
  ) {}
  async findAll(): Promise<Cuidador[]> {
    const result = await this.cuidadorRepository.find({ relations: ['categorias', 'dias', 'resenas', 'resenas.usuario'] });
    result.forEach(cuidador => {
      console.log({
        id: cuidador.id,
        nombre: cuidador.nombre,
        dias: cuidador.dias.map(dia => dia.nombre),
        resenas: cuidador.resenas
          ? cuidador.resenas.map(resena => ({
              id: resena.id,
              comentario: resena.comentario,
              calificacion: resena.calificacion,
        
            }))
          : [],
      });
    });
    return result;
  }
  
  
  async findOne(id: number): Promise<Cuidador> {
    const cuidador = await this.cuidadorRepository.findOne({
      where: { id },
      relations: ['categorias'],
    });
    if (!cuidador) {
      throw new NotFoundException(`Cuidador #${id} not found`);
    }
    return cuidador;
  }

}
