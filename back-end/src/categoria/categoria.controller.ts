// src/categoria/categoria.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entity/categoria.entity';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaService.findAll();
  }
}
