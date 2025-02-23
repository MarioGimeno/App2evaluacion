// src/contrataciones/dto/update-contratacion.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsArray, IsDateString } from 'class-validator';

export class UpdateContratacionDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;  // ID de la contratación a actualizar

  @IsNotEmpty()
  @IsNumber()
  cuidadorId: number;

  @IsArray()
  selectedDays: string[];

  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @IsNotEmpty()
  @IsString()
  selectedCategory: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;
}
