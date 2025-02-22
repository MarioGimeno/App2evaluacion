// role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../users/entity/users.entity';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombreRol: string;

  @OneToMany(() => Usuario, user => user.rol)
  usuarios: Usuario[];
}
