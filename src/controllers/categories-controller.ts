import express from "express";
import ICategoryService from "../services/category/icategory-service";

export default class CategoriesController {
  private readonly _router: express.Router;
  constructor(private readonly _categoryService: ICategoryService) {
    this._router = express.Router({ mergeParams: true });
    this._router.get("/", this.getAll);
    this._router.get("/:categoryId", this.getCategory);
    this._router.get("/:categoryId/products", this.getCategoryProducts);
  }

  get route() {
    return "/categories";
  }

  get router() {
    return this._router;
  }

  async getAll(req: express.Request, res: express.Response) {
    const categories = await this._categoryService.getCategories();
    res.send(categories);
  }

  async getCategory(req: express.Request, res: express.Response) {
    const categoryId = req.params.categoryId;
    const category = await this._categoryService.getCategory(categoryId);

    res.send(category);
  }

  async getCategoryProducts(req: express.Request, res: express.Response) {
    const categoryId = req.params.categoryId;
    const products = await this._categoryService.getCategoryProducts(
      categoryId
    );

    res.send(products);
  }
}
