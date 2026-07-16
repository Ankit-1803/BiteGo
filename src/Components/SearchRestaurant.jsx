import React from "react";
function SearchReastaurant({
    data :{
        card :{
            card :{
                info :{
                    id, 
                    cloudinaryImageId, 
                    costForTwoMessage, 
                    aggregatedDiscountInfoV3={}, 
                    cuisines, 
                    promoted=false, 
                    name:resName, 
                    avgRating=4, 
                    sla :{slaString}
                }
            }
        }
    }
})
{
    return (
        <div className="bg-white m-4 p-4 flex items-center gap-3 ">
            <div className="w-[30%]">
                <img className="aspect-square rounded-lg hover:cursor-pointer" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`} alt="" />
            </div>
            <div className="w-[60%]">
                <p className="line-clamp-1">{resName}</p>
                <p className="flex items-center gap-1 mt-3">
                    <i className="fi fi-ss-star"></i>
                    <span>{avgRating}</span>
                    <span>•</span>
                    <span>{slaString}</span>
                </p>
                <p>{costForTwoMessage}</p>
                <p className="line-clamp-1">{cuisines.join(", ")}</p>
            </div>
        </div>
    )
}
export default SearchReastaurant

export function withHoc(WrappedCom){
    
    return (prop)=>{
        
        return (
            <div className="relative">
                <p className="absolute top-8 text-sm bg-gray-700 rounded-lg w-7  left-7 text-white ">Ad</p>
                <WrappedCom {...prop}/>
            </div>
        )
    }
}