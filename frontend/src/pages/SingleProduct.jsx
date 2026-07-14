import BreadCrums from "@/components/BreadCrums";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  // fetch id
  const params = useParams();
  const productId = params.id;
  const { products } = useSelector((store) => store.product);
  const product = products.find((item) => item._id === productId);

  console.log("Product ID:", productId);
  console.log("Products:", products);
  console.log("Found Product:", product);

  return (
    <div className="pt-20 py-10 max-w-7xl mx-auto">
      <BreadCrums product={product} />
      <div className="mt-10 grid grid-cols-2 items-start ">
        <ProductImg images={product.productImg} />
        <ProductDesc product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;
