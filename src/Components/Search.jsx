import React, { useEffect, useState } from "react";
import Dish from "./Dish";
import SearchReastaurant, { withHoc } from "./SearchRestaurant";
import { useDispatch, useSelector } from "react-redux";

function Search(){
    
    const [searchQuery,setSearchQuery]=useState("")
    const [dishes,setDishes]=useState([])
    const [restaurantData,setRestaurantData]=useState([])
    

    const PromotedRes=withHoc(SearchReastaurant)

    const filterOptions=[ "Restaurant","Dishes" ]
    const dispatch=useDispatch()

    const [activeBtn,setActiveBtn]=useState("Dishes")

    function handleFilterBtn(filterName){
        setActiveBtn(activeBtn === filterName ? activeBtn : filterName)
    }




    async function fetchDishes() {
        let data=await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.6315&lng=77.2167&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=91b41acd-c558-c6ec-f675-f3bdd1b8ed20`)
        let result= await data.json();
        let finalData=(result?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter((data)=> data?.card?.card?.dishes || data?.card?.card?.info)
        setDishes(finalData)
    }



    async function fetchRestaurantData() {
        let data=await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.6315&lng=77.2167&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=91b41acd-c558-c6ec-f675-f3bdd1b8ed20&selectedPLTab=RESTAURANT`)
        let result= await data.json();
        let finalData=(result?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data)=>data?.card?.card?.info)
        setRestaurantData(finalData)

    }

    function handleSearchQuery(e){
        let val=e.target.value
        if(e.keyCode==13) setSearchQuery(val)
    }

    useEffect(()=>{
        if(searchQuery===""){
            return;
        }
        setSearchQuery("")
        fetchDishes()
        fetchRestaurantData()
    },[searchQuery])


    
    return (
        <div className="w-full md:w-[800px] mt-10 mx-auto">
            <div className="w-full relative">
                <i className="text-2xl mt-1 ml-2 fi fi-rr-angle-small-left absolute top-1/2 -translate-y-1/2 hover:cursor-pointer"></i>
                <i className="fi fi-rr-search absolute right-0 mr-5 top-1/2 -translate-y-1/2 hover:cursor-pointer"></i>
                <input 
                    onKeyDown={handleSearchQuery}
                    className="border-2 w-full pl-10 py-3 focus:outline-none text-xl" type="text" placeholder="Search for restaurant and food" 
                />
            </div>

            <div className="my-8 flex flex-wrap gap-3">
                {
                    filterOptions.map((filterName,i)=>(
                        <button key={i} onClick={()=>handleFilterBtn(filterName)} className={"filterBtn  hover:cursor-pointer flex gap-2 " + (activeBtn === filterName ? "active" : "")}>
                            <p>{filterName}</p>
                        </button>
                    ))
                }
            </div>

        
            <div className="w-full md:w-[800px] mt-5 grid grid-cols-1 md:grid-cols-2 flex-wrap bg-[#f4f5f7]">
                {
                    activeBtn === "Dishes" ? 
                        dishes.map((data,i)=><Dish data={data} key={i}/>)
                    :
                        restaurantData.map((data,i)=>( data?.card?.card?.info?.promoted ?
                        <PromotedRes data={data} key={i}/> :   
                        <SearchReastaurant data={data} key={i}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Search