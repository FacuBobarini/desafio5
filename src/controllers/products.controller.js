import { productManager } from "../dao/MongoDB/models/Product.js";

export async function getProducts(req, res) {
  try {
    const baseUrl = req.baseUrl;
    const products = await productManager.getAllProducts(req.query, baseUrl);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function addProducts(req, res) {
  try {
    const products = await productManager.addElements(req.body);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getProductById(req, res) {
  try {
    const product = await productManager.getElementById(`${req.params.pid}`);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await productManager.updateElement(
      `${req.params.pid}`,
      req.body
    );
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await productManager.deleteElement(`${req.params.pid}`);
    return product._id
      ? res.status(200).json({ message: "Product deleted" })
      : res.status(404).json({ message: "Product not found!" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
