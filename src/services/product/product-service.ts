import IProductRepository, {
  ProductItemData,
} from "../../repositories/product/iproduct-repository";
import IProductService, {
  GetProductDto,
  GetProductsDto,
} from "./iproduct-service";

export default class ProductService implements IProductService {
  constructor(private readonly _productRepository: IProductRepository) {}

  async getByCategory(categoryId: string): Promise<GetProductsDto> {
    const products = await this._productRepository.getByCategory(categoryId);

    const getProductsDto = products.map((p) =>
      ProductService.mapToGetProductDto(p)
    );

    return {
      products: getProductsDto,
    };
  }

  async getAllProducts(): Promise<GetProductsDto> {
    const products = await this._productRepository.getAll();

    const getProductsDto = products.map((p) =>
      ProductService.mapToGetProductDto(p)
    );

    return {
      products: getProductsDto,
    };
  }

  static mapToGetProductDto(product: ProductItemData): GetProductDto {
    const { id, title, description, price } = product;
    return { id, title, description, price };
  }
}
