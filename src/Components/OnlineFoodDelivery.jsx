import { useState } from "react"
import RestaurantCard from "./RestaurantCard"
import { useDispatch } from "react-redux"
import { setFilterValue } from "../utils/filterSlice"

function OnlineFoodDelivery({data}){

    const filterOptions=[ "Rating 4.0+","Offers","RS. 300-RS. 600","less than RS.300" ]

    const [activeBtn,setActiveBtn]=useState(null)
    const dispatch=useDispatch()

    function handleFilterBtn(filterName){
       
        setActiveBtn(activeBtn === filterName ? null : filterName)
    }
    dispatch(setFilterValue(activeBtn))

    return(
        <div>
            <h1 className="font-bold text-2xl mt-8"> Restaurants with online food delivery </h1>
            {/* Filter wale buttons */}
            <div className="my-8 flex flex-wrap gap-3">
                {
                    filterOptions.map((filterName,i)=>(
                        <button key={i} onClick={()=>handleFilterBtn(filterName)} className={"filterBtn  hover:cursor-pointer flex gap-2 " + (activeBtn === filterName ? "active" : "")}>
                            <p>{filterName}</p>
                            <i className="mt-1 text-sm fi fi-br-cross hidden"></i>
                        </button>
                    ))
                }
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
                {
                    data.map(({info,cta:{link}})=>(
                        <div className="hover:scale-93 duration-200" key={info.id}>
                           <RestaurantCard {...info} link={link}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default OnlineFoodDelivery