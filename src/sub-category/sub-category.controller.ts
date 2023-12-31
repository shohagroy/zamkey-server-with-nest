import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ConflictException,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import pick from '../../shared/pick';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
import { paginationFields } from '../../constants/pagination';

@Controller('api/v1/categories/:categoryId/subcategories')
@ApiTags('subcategories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  // @UseGuards(AuthGuard('jwt'))
  // @ApiSecurity('JWT-Auth')
  @Post()
  async create(
    @Param('categoryId') categoryId: string,
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ) {
    const isAlreadyExist = await this.subCategoryService.findByName(
      createSubCategoryDto.name,
    );

    if (isAlreadyExist) {
      throw new ConflictException('Sub Category Already Exist');
    }
    createSubCategoryDto.category = categoryId;
    return await this.subCategoryService.create(createSubCategoryDto);
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
  @Get()
  async findAll(@Param('categoryId') categoryId: string, @Query() queryParams) {
    const paginationOptions = pick(queryParams, paginationFields);

    return await this.subCategoryService.findAll(categoryId, paginationOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiSecurity('JWT-Auth')
  @Post()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoryService.update(id, updateSubCategoryDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiSecurity('JWT-Auth')
  @Post()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(id);
  }
}
