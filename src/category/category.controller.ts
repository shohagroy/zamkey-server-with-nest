import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import pick from 'src/shared/pick';
import { paginationFields } from 'src/constants/pagination';
import { categoryFilterableFields } from './category.constants';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const response = this.categoryService.create(createCategoryDto);
    return response;
  }

  @Get()
  async findAll(@Query() queryParams) {
    const filters = pick(queryParams, categoryFilterableFields);
    const paginationOptions = pick(queryParams, paginationFields);

    return this.categoryService.findAll(paginationOptions, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
