import { useEffect, useState } from "react";

function useRestaurantData(){
    const [topRestaurantData,setTopRestaurantData]=useState([])
    const [onYourMindData,setonYourMindData]=useState([])
    async function fetchData() {
        const data=await fetch("https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=28.6315&lng=77.2167&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const result = await data.json();
        
        setTopRestaurantData(result?.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setonYourMindData(result?.data.cards[0]?.card?.card?.imageGridCards?.info)
    }
    useEffect(()=>{
        fetchData()
    },[])

    return [topRestaurantData, onYourMindData]
}
export default useRestaurantData