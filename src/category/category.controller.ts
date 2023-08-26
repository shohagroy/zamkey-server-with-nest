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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import pick from 'src/shared/pick';
import { categoryFilterableFields } from './category.constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { paginationFields } from 'src/constants/pagination';
import { ApiQuery } from '@nestjs/swagger';

@Controller('api/v1/categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const response = this.categoryService.create(createCategoryDto);
    return response;
  }

  @ApiQuery({ name: 'searchTerm', required: false })
  @ApiQuery({ name: 'subcategory', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
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

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
