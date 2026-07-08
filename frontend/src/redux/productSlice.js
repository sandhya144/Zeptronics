import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[]
    },
    reducers:{
        //actions
        setProducts:(state, action) =>{
           
    console.log("Reducer called");
    console.log(action.payload);
    
            state.products = action.payload
        }
    }
})

export const {setProducts} = productSlice.actions
export default productSlice.reducer