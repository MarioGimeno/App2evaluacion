// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Rol } from '../../roles/entity/roles.entity';
import { Contratacion } from '../../contrataciones/entity/contrataciones.entity';
import { DiaSemana } from 'src/cuidadores/entity/diasemana.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;


  @Column({ unique: true })
  email: string;

  // Propiedad para guardar la URL de la imagen
  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  password: string;


  @ManyToOne(() => Rol, rol => rol.usuarios, { eager: true })
  rol: Rol;
  contratacionesFamilia: any;
  contratacionesCuidador: any;
  

  // Otras relaciones, según tu modelo...
}
