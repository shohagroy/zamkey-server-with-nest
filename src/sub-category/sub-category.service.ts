import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory, SubCategoryDoc } from './schema/SubCategory.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGenericResponse } from 'interface/common';
import { Category, CategoryDoc } from 'src/category/schema/Category.schema';
import { IPaginationOptions } from 'interface/pagination.interface';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { deleteImages, uploadImages } from 'utils/uploadImages';

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
    const imageData = [createSubCategoryDto?.icon];
    const images = await uploadImages(imageData);
    createSubCategoryDto.icon = images[0];

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
    if (updateSubCategoryDto?.icon) {
      const subCategory = await this.subCategoryModel.findById(id);
      const oldImage = [subCategory?.icon];
      await deleteImages(oldImage);
      const imageData = [updateSubCategoryDto?.icon];
      const images = await uploadImages(imageData);
      updateSubCategoryDto.icon = images[0];
    }

    const result = await this.subCategoryModel.findByIdAndUpdate(
      id,
      updateSubCategoryDto,
      { new: true },
    );

    return { data: result, message: 'Sub-Category Update Successfully' };
  }

  async remove(id: string) {
    const subCategory = await this.subCategoryModel.findById(id);

    if (!subCategory) {
      throw new NotFoundException('Sub-Category Not Found');
    }

    await deleteImages([subCategory?.icon]);
    const result = await this.subCategoryModel.findByIdAndDelete(id);

    return { data: result, message: 'Sub-Category Delete Successfully' };
  }

  async findByName(name: string) {
    const result = await this.subCategoryModel
      .findOne({ name })
      .populate({ path: 'category' });
    return result;
  }
}
