// src/products/dto/update-product.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './createProductoDto.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
