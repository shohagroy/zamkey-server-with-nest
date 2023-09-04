import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDoc } from './schema/Product.schema';
import mongoose, { Model, SortOrder } from 'mongoose';
import { IGenericResponse } from 'interface/common';
import { IPaginationOptions } from 'interface/pagination.interface';
import { IProductFilters, productSearchableFields } from './product.constants';
import { paginationHelpers } from '../../helpers/paginationHelper';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDoc>,
  ) {}
  async create(
    createProductDto: CreateProductDto,
  ): Promise<IGenericResponse<ProductDoc>> {
    const result = await this.productModel.create(createProductDto);

    return { data: result, message: 'Product Create Successfully!' };
  }

  async findAll(
    paginationOptions: IPaginationOptions,
    filters: IProductFilters,
  ): Promise<IGenericResponse<ProductDoc[]>> {
    const { page, limit, skip, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);

    const { searchTerm, minPrice, maxPrice, discount, sortBy, ...filtersData } =
      filters;

    const andConditions = [];

    if (searchTerm) {
      andConditions.push({
        $or: productSearchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }

    if (maxPrice) {
      andConditions.push({
        price: {
          $lte: maxPrice,
        },
      });
    }

    if (minPrice) {
      andConditions.push({
        price: {
          $gte: minPrice,
        },
      });
    }

    if (discount) {
      andConditions.push({
        discount: {
          $gt: 0,
        },
      });
    }

    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }

    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await this.productModel
      .find(whereConditions)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.productModel
      .countDocuments(whereConditions)
      .exec();

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
      },
      message: 'Products Recieved Successfully!',
    };
  }

  async findOne(
    id: mongoose.Types.ObjectId,
  ): Promise<IGenericResponse<ProductDoc>> {
    console.log(id);
    const result = await this.productModel.findById(id);

    return { data: result, message: 'Products Recieved Successfully!' };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IGenericResponse<ProductDoc>> {
    const result = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    return { data: result, message: 'Products Update Successfully!' };
  }

  async remove(
    id: mongoose.Types.ObjectId,
  ): Promise<IGenericResponse<ProductDoc>> {
    const result = await this.productModel.findByIdAndDelete(id);

    return { data: result, message: 'Products Delete Successfully!' };
  }
}
