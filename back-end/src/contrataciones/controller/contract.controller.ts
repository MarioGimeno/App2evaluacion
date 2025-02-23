// src/contracts/contract.controller.ts
import { Controller, Post, Body, NotFoundException, Param, Get, Put, Delete } from '@nestjs/common';
import { ContractService } from '../service/contrataciones.service';
import { CreateContractDTO } from '../dto/createContractDto';
import { Contratacion } from '../entity/contrataciones.entity';
import { UpdateContratacionDTO } from '../dto/updateContratacionDto.dto';

@Controller('contrataciones')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get('usuario/:id')
  async getContractsByUser(@Param('id') id: number): Promise<Contratacion[]> {
    console.log('Entrando ' + id);
    const contracts = await this.contractService.findByUser(id);
    if (!contracts || contracts.length === 0) {
      throw new NotFoundException(`No se encontraron contrataciones para el usuario #${id}`);
    }
    console.log(contracts);
    return contracts;
  }
  @Post()
  async create(@Body() createContractDto: CreateContractDTO): Promise<Contratacion> {
    console.log(createContractDto);
    return this.contractService.createContract(createContractDto);
  }
  @Put('update')
  async update(@Body() updateContratacionDto: UpdateContratacionDTO): Promise<Contratacion> {
    return this.contractService.updateContratacion(updateContratacionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ success: boolean }> {
    const success = await this.contractService.deleteContratacion(id);
    return { success };
  }
}
