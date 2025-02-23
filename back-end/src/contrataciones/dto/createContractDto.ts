// src/contracts/dto/create-contract.dto.ts
import { IsDefined, IsNotEmpty, IsNumber, IsArray, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateContractDTO {
  @IsDefined()
  @IsNumber()
  cuidadorId: number;

  @IsDefined()
  @IsArray()
  selectedDays: string[];

  @IsDefined()
  @IsDateString()
  startTime: Date;

  @IsDefined()
  @IsDateString()
  endTime: Date;

  @IsDefined()
  @IsString()
  selectedCategory: string;

  @IsDefined()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsString()
  instructions?: string;
  
  @IsDefined()
  @IsNumber()
  usuarioId: number;
  // Si es necesario, también incluye usuarioId, etc.
}
