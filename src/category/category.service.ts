import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDoc } from './schema/Category.schema';
import { Model } from 'mongoose';
import { IPaginationOptions } from 'interface/pagination.interface';
import { ICategoryFilters } from './category.module';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from 'interface/common';
import { deleteImages, uploadImages } from 'utils/uploadImages';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDoc>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<IGenericResponse<CategoryDoc>> {
    const imageData = [createCategoryDto?.icon];

    const images = await uploadImages(imageData);
    createCategoryDto.icon = images[0];

    const createCategory = new this.categoryModel(createCategoryDto);
    const result = await createCategory.save();
    return { data: result, message: 'Category Create Successfully' };
  }

  async findAll(
    paginationOptions: IPaginationOptions,
    filters: ICategoryFilters,
  ): Promise<IGenericResponse<CategoryDoc[]>> {
    const { page, limit, skip } =
      paginationHelpers.calculatePagination(paginationOptions);

    const { subcategory } = filters;

    if (subcategory) {
      const query = this.categoryModel
        .find()
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'subCategories',
          model: 'SubCategory',
          select: ['name'],
        });
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
    } else {
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
  }

  async findOne(id: string): Promise<IGenericResponse<CategoryDoc>> {
    const result = await this.categoryModel
      .findById(id)
      .populate({
        path: 'subCategories',
        model: 'SubCategory',
        select: ['name'],
      })
      .exec();
    return { data: result, message: 'Category Recvieved Successfully' };
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<IGenericResponse<CategoryDoc>> {
    if (updateCategoryDto?.icon) {
      const category = await this.categoryModel.findById(id);
      const oldImage = [category?.icon];
      await deleteImages(oldImage);
      const imageData = [updateCategoryDto?.icon];
      const images = await uploadImages(imageData);
      updateCategoryDto.icon = images[0];
    }

    const result = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    return { data: result, message: 'Category Update Successfully' };
  }

  async remove(id: string) {
    const category = await this.categoryModel.findById(id);

    const images = [category?.icon];
    await deleteImages(images);

    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    return { data: result, message: 'category Detele Successfully!' };
  }

  async findByName(name: string) {
    const result = await this.categoryModel
      .findOne({ name })
      .populate({
        path: 'subCategories',
        model: 'SubCategory',
        select: ['name'],
      })
      .exec();
    // return { data: result, message: 'Category Recvieved Successfully' };
    return result;
  }
}
