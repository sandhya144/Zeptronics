
import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setCart } from "@/redux/productSlice";


const ProductCard = ({ product, loading }) => {
  const {
    productImg = [],
    productPrice,
    productName,
  } = product || {};

  const accessToken = localStorage.getItem('accessToken')
  console.log(accessToken);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(productImg);
  console.log(productImg?.length);
  console.log(productImg?.[0]?.url);

  const addToCart = async(productId) => {
    

     try {

    // User can not add to cart without login
    if(!accessToken){
        toast.error("Please login first");
        navigate("/login");
        return;
    }
      
      const res = await axios.post(`http://localhost:8000/api/v1/cart/add`,{productId},{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      }) 
      if(res.data.success){
        toast.success('Product added to cart')
        dispatch(setCart(res.data.cart))  // getcart -> setcart ->  store cart in redux 
      }
      
     } catch (error) {
      console.log(error)
     }
  }


  return (
    <div className="shadow-lg rounded-lg overflow-hidden h-max">

      <div className="w-full h-full aspect-square overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            src={productImg?.[0]?.url}
            alt={productName}
            className="w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
          />
        )}
      </div>

      {loading ? (
        <div className="px-2 space-y-2 my-2">
          <Skeleton className="w-50 h-4" />
          <Skeleton className="w-38 h-4" />
          <Skeleton className="w-25 h-8" />
        </div>
      ) : (
        <div className="px-2 space-y-1">
          <h1 className="font-semibold h-12 line-clamp-2">
            {productName}
          </h1>

          <h2 className="font-bold">
            ₹{productPrice}
          </h2>

          <Button onClick={()=> addToCart(product._id)} className="bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] mb-3 w-full">
            <ShoppingCart />
            Add to cart
          </Button>
        </div>
      )}

    </div>
  );
};

export default ProductCard;