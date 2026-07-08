import { FaSleigh } from "react-icons/fa";
import { Product } from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const addProduct = async (req, res) => {
  try {
    const { productName, productDesc, productPrice, category, brand } =
      req.body;

    const userId = req.id;
    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // handle multiple image upload
    let productImg = [];
    if (req.files && req.files.length > 0) {
      // data uri
      for (let file of req.files) {
        const fileUri = getDataUri(file);

        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "mern_products", // cloudinary folder name
        });

        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }


    //create a product in DB
    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      productImg, // array of obj [{url,public_id},{url,public_id}]
    });
    return res.status(200).json({
      success: true,
      message: "Product added successfully.",
      product: newProduct,
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "No product available",
        products: [],
      });
    }
    return res.status(200).json({
      success: true,
      products: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // delete images from cloudinary
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // delete product from MongoDB
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: FaSleigh,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
     console.log("🔥 updateProduct controller called");
  try {
    const { productId } = req.params;
    console.log(req.params);

    const {
      productName,
      productImg,
      productDesc,
      productPrice,
      category,
      brand,
      existingImg,
    } = req.body;

    const product = await Product.findById(productId);

    console.log(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    let updatedImg = [];

    // keep selected old Images
    if (existingImg) {
      const keepIds = JSON.parse(existingImg);
      updatedImg = product.productImg.filter(
        (
          img, // will give u the single images
        ) => keepIds.includes(img.public_id),
      );

      // delete only removed images 
      const removedImg = product.productImg.filter(
        (img) => !keepIds.includes(img.public_id)
      );
      for (let img of removedImg) {
        await cloudinary.uploader.destroy(img.public_id)
      }

    } else{
        updatedImg = product.productImg // keep all if nothing sent 
    }

    //upload new images if any 
    if(req.files && req.files.length > 0){
        for(let file of req.files){
            const fileUri = getDataUri(file)
            const result = await cloudinary.uploader.upload(fileUri, {folder:"mern_products"})
            updatedImg.push({
                url: result.secure_url,
                public_id: result.public_id,
            })
        }
    }

    // update product 
    product.productName = productName || product.productName;
    product.productDesc = productDesc || product.productDesc;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    // product.productImg = productImg || product.productImg;
     product.productImg = updatedImg;
   
    await product.save()

    return res.status(200).json({
        success:true,
        message:"Product Updated Successfully"
    })
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

