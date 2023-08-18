/* eslint-disable prettier/prettier */
export const productFilterableFields = [
  'searchTerm',
  'category',
  'subcategory',
  'minPrice',
  'maxPrice',
  'discount',
  'brand',
  'sortBy',
];

export const productSearchableFields = ['title'];

export type IProductFilters = {
  searchTerm?: string;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  discount?: number;
  brand?: string;
  sortBy?: string;
};
