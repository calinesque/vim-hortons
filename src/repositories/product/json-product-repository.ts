import { JSONFile, Low } from "lowdb/lib";
import { join } from "path";
import IProductRepository, { ProductItemData } from "./iproduct-repository";

const DATABASE_FILE_PATH = join(__dirname, "data/products.json");

export type JsonProductsData = {
  products: ProductItemData[];
};

async function getDatabase() {
  const databaseAdapter = new JSONFile<JsonProductsData>(DATABASE_FILE_PATH);
  const database = new Low(databaseAdapter);
  await database.read();
  return database;
}

export default class JsonProductRepository implements IProductRepository {
  async getAll(): Promise<ProductItemData[]> {
    const database = await getDatabase();
    return database.data?.products ?? [];
  }

  async getByCategory(categoryId: string): Promise<ProductItemData[]> {
    const database = await getDatabase();
    return (
      database.data?.products.filter((p) => p.categoryId === categoryId) ?? []
    );
  }
}
