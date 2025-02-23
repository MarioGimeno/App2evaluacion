// src/contracts/entity/contrataciones.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Usuario } from '../../users/entity/users.entity';
import { Cuidador } from '../../cuidadores/entity/cuidadores.entity';

@Entity()
export class Contratacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  selectedDays: string[];

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;

  @Column()
  selectedCategory: string;

  @Column('float')
  totalPrice: number;

  @Column({ nullable: true })
  instructions?: string;

  @ManyToOne(() => Usuario, user => user.contrataciones)
  usuario: Usuario;
  
  @Column({ nullable: true })
  usuarioId: number;

  @Column({ nullable: true })
  cuidadorId: number;

  // Relación con Cuidador. Al establecer "eager: true", cada vez que se consulte una contratación, se traerá el cuidador.
  @ManyToOne(() => Cuidador, { eager: true })
  @JoinColumn({ name: 'cuidadorId' })
  cuidador: Cuidador;

  @CreateDateColumn()
  createdAt: Date;
}
