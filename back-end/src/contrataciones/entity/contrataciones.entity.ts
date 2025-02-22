// contratacion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../users/entity/users.entity';

@Entity()
export class Contratacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaContratacion: Date;

  @Column()
  estado: string;

  // Usuario que contrata (familia)
  @ManyToOne(() => Usuario, user => user.contratacionesFamilia, { eager: true })
  familia: Usuario;

  // Usuario que es contratado (cuidador)
  @ManyToOne(() => Usuario, user => user.contratacionesCuidador, { eager: true })
  cuidador: Usuario;
}
