import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
        cart:[],
    },
    reducers:{
        //actions
        setProducts:(state, action) =>{
           
    console.log("Reducer called");
    console.log(action.payload);

            state.products = action.payload
        },
        setCart:(state,action) =>{
            state.cart = action.payload
        }
    }
})

export const {setProducts, setCart} = productSlice.actions
export default productSlice.reducer