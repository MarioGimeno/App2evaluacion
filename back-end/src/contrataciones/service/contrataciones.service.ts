// src/contracts/contract.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContractDTO } from '../dto/createContractDto';
import { Contratacion } from '../entity/contrataciones.entity';
import { UpdateContratacionDTO } from '../dto/updateContratacionDto.dto';
@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contratacion)
    private readonly contractRepository: Repository<Contratacion>,
  ) {}
  async findByUser(userId: number): Promise<Contratacion[]> {
    const contracts = await this.contractRepository.find({
      where: { usuario: { id: userId } },
      relations: ['usuario'],  // Esto carga la relación para poder hacer la comparación
    });
    console.log('ac', contracts);
    if (!contracts.length) {
      throw new NotFoundException(`No se encontraron contrataciones para el usuario #${userId}`);
    }
    return contracts;
  }
  async createContract(createContractDto: CreateContractDTO): Promise<Contratacion> {
    // Crear instancia manualmente para asegurar el mapeo correcto
    const contract = new Contratacion();
    contract.cuidadorId = createContractDto.cuidadorId;
    contract.selectedDays = createContractDto.selectedDays;
    contract.startTime = createContractDto.startTime;
    contract.endTime = createContractDto.endTime;
    contract.selectedCategory = createContractDto.selectedCategory;
    contract.totalPrice = createContractDto.totalPrice;
    contract.instructions = createContractDto.instructions;
    contract.usuarioId = createContractDto.usuarioId;  // Asegurar que usuarioId se asigna correctamente
  
    try {
      return await this.contractRepository.save(contract);
    } catch (error) {
      console.error('Error al crear contrato', error);
      throw new InternalServerErrorException('Error creando contrato');
    }
  }
  async updateContratacion(updateDto: UpdateContratacionDTO): Promise<Contratacion> {
    const { id, ...updateData } = updateDto;
    const contratacion = await this.contractRepository.findOneBy({ id });
    if (!contratacion) {
      throw new NotFoundException(`Contratacion con id ${id} no encontrada`);
    }
    // Actualiza las propiedades de la contratación
    Object.assign(contratacion, updateData);
    try {
      return await this.contractRepository.save(contratacion);
    } catch (error) {
      console.error('Error al actualizar la contratación', error);
      throw new InternalServerErrorException('Error actualizando la contratación');
    }
  }

  async deleteContratacion(id: number): Promise<boolean> {
    try {
      const result = await this.contractRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Contratación con id ${id} no encontrada`);
      }
      return true;
    } catch (error) {
      console.error('Error al borrar la contratación', error);
      throw new InternalServerErrorException('Error al borrar la contratación');
    }
  }
}
