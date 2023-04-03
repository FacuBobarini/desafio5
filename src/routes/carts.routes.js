import { Router } from "express";
import {
  addCart,
  deleteAllProductsCart,
  deleteOneProductCart,
  getCartById,
  getCarts,
  updateAllProductsCart,
  updateOneProductCart,
} from "../controllers/carts.constroller.js";
const cartRouter = Router();

cartRouter.post("/", addCart);

cartRouter.get("/", getCarts);

cartRouter.get("/:cid", getCartById);

cartRouter.put("/:cid/product/:pid", updateOneProductCart);

cartRouter.delete("/:cid/product/:pid", deleteOneProductCart);

cartRouter.delete("/:cid", deleteAllProductsCart);

cartRouter.put("/:cid", updateAllProductsCart);

export default cartRouter;
