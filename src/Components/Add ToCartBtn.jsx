import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utils/cartSlice";
function AddToCartBtn({info}){

    const cartData=useSelector((state)=>state.cartSlice.cartItems)
    const dispatch=useDispatch()
    function handleAddToCart(){
        const isAdded=cartData.find((data)=>data?.id===info?.id)

        if(!isAdded){
            dispatch(addToCart({info}))
            toast.success("Food is Successfully add to yor cart")
        }
        else{
            toast.error("This item is already added in your cart")
        }
    }

    return (
        <button onClick={handleAddToCart} className="bg-white px-8 py-2 drop-shadow-2xl rounded-2xl text-green-800 text-lg font-bold absolute bottom-[-20px] left-1/2 -translate-x-1/2  hover:bg-gray-300">Add</button>
    )
}
export default AddToCartBtn