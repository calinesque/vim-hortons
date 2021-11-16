import express from "express";
import CategoryController from "./controllers/categories-controller";
import ProductController from "./controllers/product-controller";
import JsonCategoryRepository from "./repositories/category/json-category-repository";
import JsonProductRepository from "./repositories/product/json-product-repository";
import CategoryService from "./services/category/category-service";
import ProductService from "./services/product/product-service";

const app = express();

const jsonProductRepository = new JsonProductRepository();
const productService = new ProductService(jsonProductRepository);
const productController = new ProductController(productService);

const jsonCategoryRepository = new JsonCategoryRepository();
const categoryService = new CategoryService(jsonCategoryRepository, jsonProductRepository);
const categoryController = new CategoryController(categoryService);

const controllers = [productController, categoryController];

controllers.forEach((controller) => {
  app.use(controller.route, controller.router);
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.info(`Listening on port ${PORT}...`));
