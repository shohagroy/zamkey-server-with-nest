import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory, SubCategoryDoc } from './schema/Category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGenericResponse } from 'src/interface/common';
import { Category, CategoryDoc } from 'src/category/schema/Category.schema';
import { IPaginationOptions } from 'src/interface/pagination.interface';
import { paginationHelpers } from 'src/helpers/paginationHelper';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategoryDoc>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDoc>,
  ) {}

  async create(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<IGenericResponse<SubCategoryDoc>> {
    const createSubCategory = new this.subCategoryModel(createSubCategoryDto);
    const subCategory = await createSubCategory.save();

    if (subCategory._id) {
      await this.categoryModel.findByIdAndUpdate(
        { _id: subCategory.category },
        {
          $push: { subCategories: subCategory._id },
        },
      );
    }

    return { data: subCategory, message: 'Subcategory Create Successfully!' };
  }

  async findAll(categoryId: string, paginationOptions: IPaginationOptions) {
    const { page, limit, skip } =
      paginationHelpers.calculatePagination(paginationOptions);

    const result = await this.subCategoryModel
      .find({ category: categoryId })
      .limit(limit)
      .skip(skip)
      .populate({ path: 'category', select: ['name'] });

    const total = await this.subCategoryModel.countDocuments({
      category: categoryId,
    });

    return {
      message: 'Sub-Categories Recieved Successfully',
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  }

  async findOne(id: string) {
    const result = await this.subCategoryModel
      .findById(id)
      .populate({ path: 'category' });
    return { data: result, message: 'Sub-Category Recieved Successfully!' };
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const result = await this.subCategoryModel.findByIdAndUpdate(
      id,
      updateSubCategoryDto,
      { new: true },
    );

    return { data: result, message: 'Sub-Category Update Successfully' };
  }

  async remove(id: string) {
    const result = await this.subCategoryModel.findByIdAndDelete(id);

    return { data: result, message: 'Sub-Category Delete Successfully' };
  }
}
