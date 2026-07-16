
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { toggleLogin } from "../utils/toggleSlice";

function Cart(){
    
    const cartData=useSelector((state)=>state.cartSlice.cartItems)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    let vegIcon="https://i.pinimg.com/564x/61/12/6d/61126d135fe2433d3c744dddc3b0343d.jpg"
    let nonVegIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/3840px-Non_veg_symbol.svg.png"

    let totalPrice=0;
    for(let i=0;i<cartData.length;i++){
        totalPrice=totalPrice+cartData[i].price/100
    }


    function handleRemoveFromCart(i){
        let newArr=[...cartData]
        newArr.splice(i,1);
        dispatch(deleteItem(newArr))
        toast.success("Item removed from cart")
    }

    const userData=useSelector((state)=>state.authSlice.userData)
    // clear the cart
    function handleClearCart(){

        dispatch(clearCart())
        toast.success("Your cart is empty")
    }
    // order placed
    function handlePlaceOrder(){
        if(!userData){
            toast.error("Please Login ")
            dispatch(toggleLogin())
            return


        }
        toast.success("order is placed!")
    }
    
    if(cartData.length===0){
        return <div className="w-full">
                    <div className="w-[50%] mx-auto">
                        <h1>Your cart is empty!</h1>
                        <Link to="/" className="bg-green-700 p-2 mt-6 inline-block rounded-2xl">Order from here</Link>
                    </div>
                </div>
    }
    return(
        <div className="w-full">
            <div className="w-[95%] md:w-[800px] mx-auto my-10">

                <div >
                    {
                        cartData.map(({name, price="29900", itemAttribute="VEG", ratings :{aggregatedRating :{rating="4.2",ratingCountV2="17"}={}}={}, description, imageId})=>{
                            // const [isMore,setIsMore]=useState(false)
                            let trimDesc=description.substring(0,140)
                            return <div key={imageId}>
                                <div className="flex my-8 justify-between w-full min-h-[182px]">
                                    <div className="w-[55%] md:w-[70%]">
                                        <img className="w-5 rounded-sm" src={(itemAttribute && itemAttribute.vegClassifier==="VEG" ?vegIcon :nonVegIcon )} alt="" />
                                        <h2 className="font-semibold text-xl">{name}</h2>
                                        <p className="font-semibold text-xl">₹ {price/100}</p>
                                        <p className="flex gap-2">
                                            <i className=" text-yellow-400 text-xl fi fi-ss-star"></i>
                                            <span>{rating} ({ratingCountV2})</span>
                                        </p>

                                        <div className="line-clamp-2">{description}</div>
                                        {/* {
                                            description.length>140 ? <div>
                                                <span className=" text-sm ">{isMore ? description : trimDesc}</span> ...
                                                <button className="font-bold text-gray-500 hover:cursor-pointer" onClick={()=>setIsMore(!isMore)}>{isMore ? "less" : "more"}</button>
                                            </div> :  <span className=" text-sm ">{trimDesc}</span>
                                        } */}
                                    </div>
                                    {/* Image and Image pe Add Button */}
                                    <div className="w-[40%] md:w-[20%] relative h-full">
                                        <img className="rounded-xl aspect-square hover:cursor-pointer " src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId } alt="" />
                                        <button onClick={handleRemoveFromCart} className="bg-white px-5 py-2 drop-shadow-2xl rounded-2xl text-red-800 text-base font-bold absolute bottom-[-20px] left-1/2 -translate-x-1/2  hover:bg-gray-300">Remove</button>
                                    </div>
                                </div>
                                <hr className="my-5 border-slate-200/70"/>
                            </div>
                        })

                    }
                </div>

                <h1 className="text-2xl">Total - <span className="font-bold">₹{totalPrice}</span></h1>
                <div className="flex justify-between">
                    <button onClick={handleClearCart} className="bg-green-700 rounded-lg p-3 my-7 hover:cursor-pointer">Clear Cart</button>
                    <button onClick={handlePlaceOrder}className="bg-green-700 rounded-lg p-3 my-7 hover:cursor-pointer">Place Order</button>
                </div>
            </div>
        </div>
    )
}
export default Cart