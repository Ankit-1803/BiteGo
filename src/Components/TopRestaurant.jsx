import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
// import locat

function TopRestaurant({data}){
    
    let [value,setValue]=useState(0)
    
        function handlePrev(){
            if(value>0) setValue((prev)=>prev-43);
        }
        function handleNext(){
          if(value<400) setValue((prev)=>prev+43);
        }

    return (
        <div className="mt-14">
            <div className="flex justify-between mt-3">
                <h1 className="font-bold text-2xl">Top restaurant chains at your location</h1>
                <div className="flex gap-2 ">
                    <div onClick={handlePrev} className="rounded-full bg-gray-200 h-9 w-9 flex justify-center items-center cursor-pointer">
                        <i className="text-2xl mt-1 fi fi-rr-arrow-small-left"></i>
                    </div>
                    <div onClick={handleNext} className="rounded-full bg-gray-200 h-9 w-9 flex justify-center items-center cursor-pointer">
                        <i className="text-2xl mt-1 fi fi-rr-arrow-small-right"></i>
                    </div>
                </div>
            </div>
                    
            <div className={`flex mt-4 gap-4 w-full duration-300`} style={{translate:`-${value}%`}}>
                {
                    data.map(({info,cta:{link}})=>(
                        <div className="hover:scale-93 duration-200" key={info.id}>
                           <RestaurantCard {...info} link={link}/>
                        </div>
                    ))
                }
            </div>
            <hr className="text-gray-300 border mt-10"/>
        </div>
    )
}
export default TopRestaurant