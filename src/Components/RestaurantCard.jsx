import React from "react"
import { Link } from "react-router-dom"
function RestaurantCard(info){
    
    return (
        <Link to={`/restaurantMenu/${info.link.split("/")[5]}`}>
            <div className="min-w-[295px] h-[182px] relative">
                <img className="w-full h-full object-cover rounded-2xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+ info?.cloudinaryImageId} alt="Food Cards" />
                <div className="bg-gradient-to-t from-black from-2% to-transparent to-40% rounded-2xl w-full h-full absolute top-0"></div>
                <p className="absolute bottom-0 text-white text-2xl ml-5 font-bold">
                    {
                        //if subheader is not exits so this prevent to render UNDEFINED
                        info?.aggregatedDiscountInfoV3?.subHeader
                        ? `${info.aggregatedDiscountInfoV3.header} ${info.aggregatedDiscountInfoV3.subHeader}`
                        : info?.aggregatedDiscountInfoV3?.header
                    }
                </p>
            </div>
            <div className="mt-3">
                <h1 className="font-bold text-lg line-clamp-1">{info?.name}</h1>
                <p className="flex items-center gap-1 font-semibold text-base"><i className="fi fi-sr-circle-star text-green-700"></i> <span>{info?.avgRating}</span><span>•</span><span className="font-bold text-base">{info?.sla?.slaString}</span></p>
                <p className="line-clamp-1 text-black/60 font-medium">{info?.cuisines.join(", ")}</p>
                <p className="text-black/60 font-medium">{info?.locality}</p>
            </div>
        </Link>
    )
}
export default RestaurantCard