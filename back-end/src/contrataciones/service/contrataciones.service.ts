// src/contracts/contract.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContractDTO } from '../dto/createContractDto';
import { Contratacion } from '../entity/contrataciones.entity';
import { UpdateContratacionDTO } from '../dto/updateContratacionDto.dto';
import { getNotificationPayload, ContratacionData } from '../../helper/NotificationHelper';
import * as AWS from 'aws-sdk';

@Injectable()
export class ContractService {
  private lambda: AWS.Lambda;

  constructor(
    @InjectRepository(Contratacion)
    private readonly contractRepository: Repository<Contratacion>,
  ) {
    // Configura la región (asegúrate de que coincida con la de tu función Lambda)
    AWS.config.update({ region: 'us-east-1' });
    this.lambda = new AWS.Lambda();
  }

  async findByUser(userId: number): Promise<Contratacion[]> {
    const contracts = await this.contractRepository.find({
      where: { usuario: { id: userId } },
      relations: ['usuario'],  // Carga la relación para poder hacer la comparación
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
      // Guarda el contrato en la BD
      const savedContract = await this.contractRepository.save(contract);

      // Extrae el payload necesario para la notificación
      const notificationPayload: ContratacionData = getNotificationPayload(savedContract);
      
      // Invoca la función Lambda para enviar la notificación
      await this.invokeNotificationLambda(notificationPayload);

      return savedContract;
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

  /**
   * Invoca la función Lambda que envía la notificación.
   * @param payload Datos necesarios para la notificación.
   */
  private async invokeNotificationLambda(payload: ContratacionData): Promise<void> {
    // Define el nombre o ARN de la función Lambda
    const functionName = 'LambdaPythonSNS'; // Reemplaza con el nombre real
    console.log(payload);
    const params: AWS.Lambda.InvocationRequest = {
      FunctionName: functionName,
      InvocationType: 'RequestResponse', // Cambio a sincrónica
      Payload: JSON.stringify(payload),
    };
    
    try {
      const result = await this.lambda.invoke(params).promise();
      console.log('Lambda invocada:', result);
      // Procesa result.Payload (posiblemente parsearlo con JSON.parse)
    } catch (error) {
      console.error('Error al invocar Lambda para notificación:', error);
    }
    
  }
}
