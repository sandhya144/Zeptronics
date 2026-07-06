import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        productName:{type:String, required:true},
        productDesc:{type:String,required:true},

        productImg:[
            {
             url:{type: String, required: true},
             public_id:{type: String, required: true}  // will be used while destroying a product -> cloudinary se img delete krne pr us prd ka sb delete ho jaye
        }
    ],
    productPrice:{type:Number},
    category:{type:String},
    brand:{type:String}
    },
    {timestamps:true}   // we will get createdAt and UpdatedAt
)

export const Product = mongoose.model("Product", productSchema)