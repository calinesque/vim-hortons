import express from "express";
import IProductService from "../services/product/iproduct-service";

export default class ProductController {
  private readonly _router: express.Router;
  constructor(private readonly _productService: IProductService) {
    this._router = express.Router();
    this._router.get("/", this.getAll);
  }

  get route() {
    return "/products";
  }

  get router() {
    return this._router;
  }

  async getAll(req: express.Request, res: express.Response) {
    const products = await this._productService.getAllProducts();
    res.send(products);
  }
}
