import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cartSlice",
    initialState:{
        cartItems:JSON.parse(localStorage.getItem("cartData")) || [],
    },
    reducers:{
        addToCart:(state,action)=>{
            // console.log(action.payload)
            const {info} = action.payload
            state.cartItems=[...state.cartItems , info]
            localStorage.setItem("cartData",JSON.stringify(state.cartItems))
        },
        deleteItem:(state,action)=>{
            state.cartItems = action.payload
            localStorage.setItem("cartData",JSON.stringify(action.payload))
        },
        clearCart:(state,action)=>{
            state.cartItems=[]
            localStorage.removeItem("cartData")
        }
    }
})

export const {addToCart,deleteItem,clearCart} = cartSlice.actions
export default cartSlice.reducer