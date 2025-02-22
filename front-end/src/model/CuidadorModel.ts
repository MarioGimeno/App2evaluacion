// src/dto/cuidador.dto.ts
import { CategoriaModel } from './CategoriaModel';
import { DiaSemanaModel } from './DiaSemanaModel';
import { ResenasModel } from './ResenaModel';

export interface CuidadorModel {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  precioPorHora: number;
  disponibilidad: string;
  urlImagen: string;
  descripcion?: string;
  experiencia: number;
  rating: number;
  certificaciones?: string;
  horarioAtencion?: string;
  // Relaciones
  categorias: CategoriaModel[];
  dias: DiaSemanaModel[];
  resenas: ResenasModel[],
}
