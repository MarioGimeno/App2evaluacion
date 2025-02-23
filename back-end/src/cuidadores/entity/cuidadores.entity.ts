// src/cuidadores/entities/cuidador.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Categoria } from '../../categoria/entity/categoria.entity';
import { Resena } from '../../resena/entity/resena.entity';
import { DiaSemana } from './diasemana.entity';

@Entity()
export class Cuidador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precioPorHora: number;

  @Column()
  disponibilidad: string;

  @Column()
  urlImagen: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'int', default: 0 })
  experiencia: number;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ nullable: true })
  certificaciones: string;

  @Column({ nullable: true })
  horarioAtencion: string;

  // Nueva columna para almacenar el ID o la URL del video de YouTube
  @Column({ nullable: true })
  source: string;

  @ManyToMany(() => Categoria, categoria => categoria.cuidadores, { cascade: true })
  @JoinTable({
    name: 'cuidador_categoria',
    joinColumn: {
      name: 'cuidador_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoria_id',
      referencedColumnName: 'id',
    },
  })
  categorias: Categoria[];

  @OneToMany(() => Resena, resena => resena.cuidador, { cascade: true })
  resenas: Resena[];

  @ManyToMany(() => DiaSemana, dia => dia.cuidadores, { cascade: true })
  @JoinTable({
    name: 'cuidador_dia',
    joinColumn: {
      name: 'cuidador_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'dia_semana_id',
      referencedColumnName: 'id',
    },
  })
  dias: DiaSemana[];
}
