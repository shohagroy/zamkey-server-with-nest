import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDoc } from './schema/Category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDoc>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDoc> {
    const createCategory = new this.categoryModel(createCategoryDto);
    return createCategory.save();
  }

  async findAll(): Promise<Category[]> {
    const result = await this.categoryModel.find().exec();
    return result;
  }

  async findOne(id: string): Promise<Category> {
    const result = await this.categoryModel.findById(id).exec();
    return result;
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
