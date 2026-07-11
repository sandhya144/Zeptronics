import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
        cart:{
            items:[],
            totalPrice:0
        },
    },
    reducers:{
        //actions
        setProducts:(state, action) =>{
           
    console.log("Reducer called");
    console.log(action.payload);

            state.products = action.payload
        },
        setCart:(state,action) =>{
            console.log("SET CART CALLED:", action.payload);
            state.cart = action.payload
        },
        clearCart:(state)=>{
        state.cart = {
        items:[],
        totalPrice:0
    };
}
    }
})

export const {setProducts, setCart, clearCart} = productSlice.actions
export default productSlice.reducer