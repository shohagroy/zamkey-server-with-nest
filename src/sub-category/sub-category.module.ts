import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, subCategorySchema } from './schema/SubCategory.schema';
import { Category, CategorySchema } from 'src/category/schema/Category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: subCategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
