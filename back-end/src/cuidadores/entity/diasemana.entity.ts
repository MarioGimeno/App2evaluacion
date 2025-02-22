// src/dias/entities/dia-semana.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Cuidador } from './cuidadores.entity';

@Entity()
export class DiaSemana {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Cuidador, cuidador => cuidador.dias)
  cuidadores: Cuidador[];
}
