export type GetProductDto = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type GetProductsDto = {
  products: GetProductDto[];
};

export default interface IProductService {
  getAllProducts(): Promise<GetProductsDto>;
  getByCategory(categoryId: string): Promise<GetProductsDto>;
}
