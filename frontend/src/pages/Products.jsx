import FilterSidebar from "@/components/FilterSidebar";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { toast } from "sonner";



const Products = () => {

    console.log("Products component rendered");

     const [allProducts, setAllProducts] = useState([])

     const [loading,setLoading] = useState()

    const getAllProducts = async() =>{

        try {
          setLoading(true)
            const res = await axios.get(`http://localhost:8000/api/v1/product/getallproducts`)
            console.log(res.data);
            console.log(res.data.products);
            if(res.data.success){
               setAllProducts(res.data.products)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally{
          setLoading(false)
        }
    }

    useEffect(()=>{
      console.log("useEffect called");
        getAllProducts()
    },[])

    console.log(allProducts);
    console.log(allProducts.length);

  return (
    <div className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* sidebar */}
        <FilterSidebar allProducts={allProducts} />
        {/* Main product section */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
           
                <Select>
                <SelectTrigger className="w-50">
                  <SelectValue  placeholder="Sort By Price"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    
                    <SelectItem  value="lowtoHigh">Price: Low to High</SelectItem>
                    <SelectItem  value="hightoLow">Price: High to low</SelectItem>
                    
                  </SelectGroup>
                </SelectContent>
                </Select>
          </div>

            {/* product grid */}

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-7">
                {
                    allProducts?.map((product)=>{
                       return  <ProductCard 
                          key={product._id}
                          product={product}
                          loading={loading}
                       />
                    })
                }
            </div>


        </div>
      </div>
    
    </div>
  );
};

export default Products;
