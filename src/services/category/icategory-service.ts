import { GetProductDto } from "../product/iproduct-service";

export type GetCategoryDto = {
  id: string;
  name: string;
};

export type GetCategoryProductsDto = {
  products: GetProductDto[];
};

export type GetCategoriesDto = {
  categories: GetCategoryDto[];
};

export default interface ICategoryService {
  getCategory(categoryId: string): Promise<GetCategoryDto | undefined>;
  getCategoryProducts(
    categoryId: string
  ): Promise<GetCategoryProductsDto | undefined>;
  getCategories(): Promise<GetCategoriesDto>;
}
