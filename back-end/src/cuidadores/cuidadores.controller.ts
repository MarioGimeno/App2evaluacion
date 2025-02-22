// src/cuidadores/cuidadores.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { CuidadoresService } from './cuidadores.service';

@Controller('cuidadores')
export class CuidadoresController {
  constructor(private readonly cuidadoresService: CuidadoresService) {}



  @Get()
  findAll() {
    return this.cuidadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cuidadoresService.findOne(id);
  }

}
