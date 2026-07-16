import React, { useEffect, useState } from "react"
function FoodLogo({data}){

    let[value,setValue]=useState(0)

    const maxSlide = Math.max(0, (data.length - 10) * 12);

    function handlePrev(){
        setValue(prev => Math.max(prev - 30, 0));
    }
    function handleNext(){
       setValue(prev => Math.min(prev + 30, maxSlide));
    }

    return (
        <div>
            <div className="flex justify-between mt-3">
                <h1 className="font-bold text-2xl"> What's on your mind? </h1>
                <div className="flex gap-2 ">
                    <div onClick={handlePrev} className="rounded-full bg-gray-200 h-9 w-9 flex justify-center items-center cursor-pointer">
                        <i className="text-2xl mt-1 fi fi-rr-arrow-small-left"></i>
                    </div>
                    <div onClick={handleNext} className="rounded-full bg-gray-200 h-9 w-9 flex justify-center items-center cursor-pointer">
                        <i className="text-2xl mt-1 fi fi-rr-arrow-small-right"></i>
                    </div>
                </div>
            </div>
                    
            <div style={{translate :`-${value}%` }} className={`flex duration-300 `}>
                {
                    data.map((item)=>(
                        <img key={item.id} className="w-32 cursor-pointer gap-10" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="Food Logo" />
                    ))
                }
            </div>
            <hr className="text-gray-300 border"/>
        </div>
    )
}
export default FoodLogo