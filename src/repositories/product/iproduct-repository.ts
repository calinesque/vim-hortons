export type ProductItemData = {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
};

export default interface IProductRepository {
  getAll(): Promise<ProductItemData[]>;
  getByCategory(categoryId: string): Promise<ProductItemData[]>;
}
