// src/resenas/entities/resena.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cuidador } from '../../cuidadores/entity/cuidadores.entity';
import { Usuario } from '../../users/entity/users.entity';

@Entity()
export class Resena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;

  @Column({ type: 'float' })
  calificacion: number; // Por ejemplo, de 1 a 5

  // Relación con el cuidador que recibe la reseña
  @ManyToOne(() => Cuidador, (cuidador) => cuidador.resenas)
  cuidador: Cuidador;

  // Relación opcional con el usuario que deja la reseña
  @ManyToOne(() => Usuario, { nullable: true })
  usuario: Usuario;
}
