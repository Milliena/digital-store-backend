import { productService } from '../services/productService.js';

export const productController = {
  async list(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const updated = await productService.updateProduct(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};