import { Body, Controller, Get, Logger, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { ResenaCreateDTO } from './dto/create-resena.dto';
import { Resena } from './entity/resena.entity';

@Controller('resena')
export class ResenaController {
 private readonly logger = new Logger(ResenaController.name);

  constructor(private readonly resenaService: ResenaService) {}

  @Get()
  findAll() {
    this.logger.log('Obteniendo todos los usuarios');
    return this.resenaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Obteniendo usuario #${id}`);
    return this.resenaService.findOne(id);
  }
  @Get('cuidador/:cuidadorId')
  async getResenasByCuidador(
    @Param('cuidadorId', ParseIntPipe) cuidadorId: number,
  ): Promise<Resena[]> {
    return this.resenaService.findByCuidador(cuidadorId);
  }
  
  @Post()
  create(@Body() payload: ResenaCreateDTO) {
    this.logger.log('Creando nueva resena ' + payload.cuidadorId);
    return this.resenaService.create(payload);
  }


}
