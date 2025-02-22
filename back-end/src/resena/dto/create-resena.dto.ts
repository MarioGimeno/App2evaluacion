import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class ResenaCreateDTO {
  @IsNotEmpty()
  @IsString()
  comentario: string;

  @IsNotEmpty()
  @IsNumber()
  calificacion: number;

  @IsNotEmpty()
  @IsNumber()
  cuidadorId: number;

  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;
}
