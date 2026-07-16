import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodLogo from "./OnYourMind";
import TopRestaurant from "./TopRestaurant";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import useRestaurantData from "../Hooks/useRestaurantData";
function Body(){
    
    const [topRestaurantData, onYourMindData] = useRestaurantData()

    // Filter on restaurants

    const filterVal=useSelector((state=>state.filterSlice.filterVal))
    
    const filteredData=topRestaurantData.filter(item=>{
        if(!filterVal) return true;
        
        
        switch (filterVal){
            case "Rating 4.0+" : return item?.info?.avgRating > 4
            case "Offers" : return item?.info?.aggregatedDiscountInfoV3?.header
            case "RS. 300-RS. 600": return item?.info?.costForTwo?.split(" ")[0].slice(1) >="300" && item?.info?.costForTwo?.split(" ")[0].slice(1) <="600"
            case "less than RS.300": return item?.info?.costForTwo?.split(" ")[0].slice(1) <="300"
            default : return true;
        }
    })

    return (
        <>
            <div className="w-full">
                {
                    topRestaurantData.length ? 
                    (
                        <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto mt-3 overflow-hidden">
                            <FoodLogo data={onYourMindData}/>
                            <TopRestaurant data={topRestaurantData}/>
                            <OnlineFoodDelivery data={filterVal ? filteredData : topRestaurantData}/>
                        </div>
                    ) :
                    <Shimmer/>
                }
            </div>
        </>
    )
}
export default Body;