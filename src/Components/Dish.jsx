import React from "react";
import { nonVegIcon, vegIcon } from "../utils/links";
import AddToCartBtn from "./Add ToCartBtn";
import { useDispatch } from "react-redux";


// pahle aise tha isase bs macbooks and ipads pe hi data render ho raha tha then i change the destructuring ways , ab phones pe 
// v data aa raha hai . phone pe card->info hai and macbooks pe card->dishes 


// data :{
//         card :{
//             card :{
//                 dishes :[{info}] , 
//                 restaurant :{
//                     info :{
//                         id ,name:resName ,avgRating, sla :{
//                             slaString}
//                         }
//                     }
//                 }
//             }
//         }

function Dish({data})
{

    const card = data?.card?.card;
    const info = card?.dishes ? card.dishes[0].info : card?.info;         
    const restaurant = card?.restaurant?.info;
    const { imageId="", name, price, isVeg = 0 } = info
    const { id, name: resName, avgRating, sla: { slaString } = {} } = restaurant;

    const dispatch=useDispatch()


    return (
        <div className="bg-white rounded-2xl p-4 m-4">
            {/* Dish ka upper pannel */}
            <div className="flex justify-between text-sm opacity-50">
                <div>
                    <p className="font-bold">By {resName}</p>
                    <p className="flex items-center gap-1 mt-3">
                        <i className="fi fi-ss-star"></i>
                        <span>{avgRating}</span>
                        <span>•</span>
                        <span>{slaString}</span>
                    </p>
                </div>
                <i className="text-2xl fi fi-rr-arrow-small-right"></i>
            </div>
            <hr className="border-dotted"/>
            {/* Dotted line ke neeche wala pannel */}
            <div className="my-3 md:max-w-fit flex justify-between">
                <div className="w-[50%] md:w-[168px] flex flex-col gap-1">
                    <div className="w-5 h-5">
                        {
                            isVeg ? <img src={vegIcon} alt="" /> : <img src={nonVegIcon} alt="" />
                        }
                    </div>
                    <p className="text-lg font-semibold">{name}</p>
                    <p className="font-bold">₹{price/100}</p>
                    <button className="px-4 py-1 w-max rounded-3xl border">More Details</button>
                </div>
                <div className="w-[40%] md:w-[40%] relative h-full">
                    <img className="rounded-xl aspect-square hover:cursor-pointer object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId } alt="" />
                   <AddToCartBtn info={info}/>
                </div>
            </div>
        </div>
    )
}
export default Dish