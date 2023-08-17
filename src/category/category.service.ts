import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDoc } from './schema/Category.schema';
import { Model } from 'mongoose';
import { IPaginationOptions } from 'src/interface/pagination.interface';
import { ICategoryFilters } from './category.module';
import { paginationHelpers } from 'src/helpers/paginationHelper';
import { IGenericResponse } from 'src/interface/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDoc>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDoc> {
    const createCategory = new this.categoryModel(createCategoryDto);
    return createCategory.save();
  }

  async findAll(
    paginationOptions: IPaginationOptions,
    filters: ICategoryFilters,
  ): Promise<IGenericResponse<Category[]>> {
    const { page, limit, skip } =
      paginationHelpers.calculatePagination(paginationOptions);

    console.log(filters);

    // const { subcategory } = filters;

    const query = this.categoryModel.find().skip(skip).limit(limit);
    const result = await query.exec();
    const total = await this.categoryModel.countDocuments();

    return {
      message: 'Categories Recieved Successfully',
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  }

  async findOne(id: string): Promise<IGenericResponse<Category>> {
    const result = await this.categoryModel.findById(id).exec();
    return { data: result, message: 'Category Recvieved Successfully' };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    return result;
  }

  async remove(id: string): Promise<Category> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    return result;
  }
}
