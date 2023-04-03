import { ManagerMongoDB } from "../../../db/managerMongoDB.js";
import { productManager } from "./Product.js";
import mongoose from "mongoose";
const schemaName = "carts";
const cartSchema = {
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantiy: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
};

class ManagerCartgeMongoDB extends ManagerMongoDB {
  constructor() {
    super(process.env.MONGODBURL, schemaName, cartSchema);
  }

  async deleteProduct(cid, pid) {
    const cart = await this.model.findById(cid);
    if (!cart) return { error: true, message: "Cart not found!" };
    const product = await productManager.getElementById(pid);
    if (!product._id) return { error: true, message: "Product not found!" };
    return cart.products.filter((product) => product.productId !== pid);
  }

  async updateProductCart(cid, pid, quantiy) {
    this.setConnection();
    let products = await this.deleteProduct(cid, pid);
    if (products.error) return products;
    products.push({ product: pid, quantiy });
    return await this.model.findByIdAndUpdate(cid, { products });
  }

  async deleteProductCart(cid, pid) {
    this.setConnection();
    let products = await this.deleteProduct(cid, pid);
    if (products.error) return products;
    return await this.model.findByIdAndUpdate(cid, { products });
  }

  async getCartProductsById(id) {
    this.setConnection();
    try {
      return await this.model.findById(id).populate("products.product");
    } catch (error) {
      return error;
    }
  }
}

export const cartManager = new ManagerCartgeMongoDB();
