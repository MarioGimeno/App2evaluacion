// src/contracts/contract.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contratacion } from '../entity/contrataciones.entity';
import { ContractService } from '../service/contrataciones.service';
import { ContractController } from '../controller/contract.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contratacion])],
  providers: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
