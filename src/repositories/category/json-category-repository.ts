import { JSONFile, Low } from "lowdb/lib";
import { join } from "path";
import ICategoryRepository, { CategoryItemData } from "./icategory-repository";

const DATABASE_FILE_PATH = join(__dirname, "data/categories.json");

export type JsonCategoriesData = {
  categories: CategoryItemData[];
};

async function getDatabase() {
  const databaseAdapter = new JSONFile<JsonCategoriesData>(DATABASE_FILE_PATH);
  const database = new Low(databaseAdapter);
  await database.read();
  return database;
}

export default class JsonCategoryRepository implements ICategoryRepository {
  async getAll(): Promise<CategoryItemData[]> {
    const database = await getDatabase();
    return database.data?.categories ?? [];
  }

  async get(id: string): Promise<CategoryItemData | undefined> {
    const database = await getDatabase();
    return database.data?.categories.find((c) => c.id === id);
  }
}
