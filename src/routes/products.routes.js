import { Router } from "express";
import {
  getProducts,
  addProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
const productRouter = Router();

productRouter.get("/:pid", getProductById);

productRouter.get("/", getProducts);

productRouter.post("/", addProducts);

productRouter.delete("/:pid", deleteProduct);

productRouter.put("/:pid", updateProduct);

export default productRouter;
