import { cartManager } from "../dao/MongoDB/models/Cart.js";

export async function addCart(req, res) {
  try {
    const cart = await cartManager.addElements(req.body);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getCarts(req, res) {
  try {
    const carts = await cartManager.getElements();
    return res.status(200).json(carts);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getCartById(req, res) {
  try {
    const cart = await cartManager.getCartProductsById(`${req.params.cid}`);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function updateOneProductCart(req, res) {
  try {
    const cart = await cartManager.updateProductCart(
      `${req.params.cid}`,
      `${req.params.pid}`,
      req.body.quantity
    );
    if (cart.error) return res.status(404).json({ message: cart.message });

    return res.status(200).json({ message: "Product added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function deleteOneProductCart(req, res) {
  try {
    const cart = await cartManager.deleteProductCart(
      `${req.params.cid}`,
      `${req.params.pid}`
    );
    if (cart.error) return res.status(404).json({ message: cart.message });

    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function deleteAllProductsCart(req, res) {
  try {
    const cart = await cartManager.updateElement(`${req.params.cid}`, {
      products: [],
    });
    return cart
      ? res.status(200).json({ message: "Products deleted" })
      : res.status(404).json({ message: "Cart not found!" });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function updateAllProductsCart(req, res) {
  try {
    const cart = await cartManager.updateElement(`${req.params.cid}`, {
      products: req.body,
    });
    return cart
      ? res.status(200).json({ message: "Products added" })
      : res.status(404).json({ message: "Cart not found!" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
