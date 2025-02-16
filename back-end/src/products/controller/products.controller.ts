// src/products/products.controller.ts
import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ProductsService } from '../service/products.service';
  import { CreateProductDto } from '../dto/createProductoDto.dto';
  import { UpdateProductDto } from '../dto/updateProductoDto.dto';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Get()
    findAll() {
      return this.productsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.productsService.findOne(id);
    }
  
    @Post()
    create(@Body() payload: CreateProductDto) {
      return this.productsService.create(payload);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() payload: UpdateProductDto,
    ) {
      return this.productsService.update(id, payload);
    }
  }
  