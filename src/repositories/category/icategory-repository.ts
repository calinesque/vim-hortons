export type CategoryItemData = {
  id: string;
  name: string;
};

export default interface ICategoryRepository {
  get(id: string): Promise<CategoryItemData | undefined>;
  getAll(): Promise<CategoryItemData[]>;
}
