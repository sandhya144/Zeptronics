import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const getCart = async (req, res) => {
  try {
       console.log("req.id =", req.id);
    const userId = req.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    console.log("Cart found =", JSON.stringify(cart, null, 2));

    if (!cart) {
      return res.json({ success: true, cart: [] });
    }

    res.status(200).json({ success: true, cart, });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    // userid and productid is required here
    const userId = req.id; // get from middleware
    const { productId } = req.body;

    // check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // find the user's cart (if exists)
    let cart = await Cart.findOne({ userId });

    // if cart doesnot exist, create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1, price: product.productPrice }],
        totalPrice: product.productPrice,
      });
    } else {
      // find if product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );
      if (itemIndex > -1) {
        // if product exists -> just increase quantity
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({
          productId,
          quantity: 1,
          price: product.productPrice,
        });
      }

      // recalculates total price
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
      );
    }
    // save updated cart
    await cart.save();

console.log(cart);
console.log(cart.totalPrice);
console.log(typeof cart.totalPrice);

    // populate product details before sending response
    const populatedCart = await Cart.findById(cart.id).populate(
      "items.productId",
    );

    res.status(200).json({
      success: true,
      message: "Product added successfully",
      cart: populatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, type } = req.body;

    let cart = await Cart.findOne({ userId });
    // check that cart exists or not
    if (!cart)
      return res.status(400).json({
        success: false,
        message: "Cart not found",
      });
    // we r checking that is added items is already present in our cart or not ?
    const item = cart.items.find(
      (item) => item.productId.toString() === productId);

    if (!item)
      return res.status(400).json({
        success: false,
        message: "Items not Found",
      });
    if (type === "increase") item.quantity += 1;

    if (type === "decrease" && item.quantity > 1) item.quantity -= 1;

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();
    cart = await cart.populate("items.productId");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({
        success: false,
        message: "Cart Not Found",
      });

    // all those prod id which i am deleting should not be in the cart now
    // we apply filter to remove  those prdId of removed items

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();
    cart = await cart.populate("items.productId");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
