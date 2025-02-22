// src/categorias/entities/categoria.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Cuidador } from '../../cuidadores/entity/cuidadores.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @ManyToMany(() => Cuidador, (cuidador) => cuidador.categorias)
  cuidadores: Cuidador[];
}
