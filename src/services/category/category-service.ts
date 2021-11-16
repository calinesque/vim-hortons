import ICategoryRepository from "../../repositories/category/icategory-repository";
import IProductRepository from "../../repositories/product/iproduct-repository";
import ProductService from "../product/product-service";
import ICategoryService, {
  GetCategoriesDto,
  GetCategoryDto,
  GetCategoryProductsDto,
} from "./icategory-service";

export default class CategoryService implements ICategoryService {
  constructor(
    private readonly _categoryRepository: ICategoryRepository,
    private readonly _productRepository: IProductRepository
  ) {}

  async getCategoryProducts(
    categoryId: string
  ): Promise<GetCategoryProductsDto | undefined> {
    const category = await this._categoryRepository.get(categoryId);

    if (!category) {
      throw Error(`Invalid category id: ${categoryId}`);
    }

    const categoryProducts = await this._productRepository.getByCategory(
      categoryId
    );

    const productsDto = categoryProducts.map((p) =>
      ProductService.mapToGetProductDto(p)
    );

    return {
      products: productsDto,
    };
  }

  async getCategories(): Promise<GetCategoriesDto> {
    const categories = await this._categoryRepository.getAll();

    return {
      categories,
    };
  }

  getCategory(categoryId: string): Promise<GetCategoryDto | undefined> {
    return this._categoryRepository.get(categoryId);
  }
}
