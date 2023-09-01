import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import pick from '../../shared/pick';
import { productFilterableFields } from './product.constants';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { paginationFields } from '../../constants/pagination';
import mongoose from 'mongoose';

@Controller('api/v1/products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiQuery({ name: 'searchTerm', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'subcategory', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiQuery({ name: 'discount', required: false })
  @ApiQuery({ name: 'brand', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
  @Get()
  // @UseGuards()
  findAll(@Query() queryParams) {
    const filters = pick(queryParams, productFilterableFields);
    const paginationOptions = pick(queryParams, paginationFields);

    return this.productService.findAll(paginationOptions, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Types.ObjectId) {
    return this.productService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Delete(':id')
  remove(@Param('id') id: mongoose.Types.ObjectId) {
    return this.productService.remove(id);
  }
}
