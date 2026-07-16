import React, { useContext, useEffect, useState } from "react"
import { useParams ,Link, data, useNavigate } from "react-router-dom"
//Downloaded json file is use
import swiggyDataFromJson from "./Swiggy.json";
import { useLocation } from "react-router-dom";
import { CartContext } from "../context/ContextApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import toast from "react-hot-toast";
import AddToCartBtn from "./Add ToCartBtn";
import Search from "./Search";

let vegIcon="https://i.pinimg.com/564x/61/12/6d/61126d135fe2433d3c744dddc3b0343d.jpg"
let nonVegIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/3840px-Non_veg_symbol.svg.png"
function RestaurantMenu(){
    let {id}=useParams()
    
    let mainId=id.split("-").at(-1).replace(/\D/g, "");
    
    const[resInfo,setResInfo]=useState([])
    const[discountData,setDiscountData]=useState([])
    const[menuData,setMenuData]=useState([])
    //HACK NAME
    const [differentRestName, setDifferentRestName] = useState([]);
    const [value,setValue]=useState(0)
    const [currIndex,setCurrIndex]=useState(false)

    function handleNext(){

    }
    function handlePrev(){


    }
    
    //This is bcz Restaurent Name API can't work 
    async function fetchMenu() {
        const data ="https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6315&lng=77.2167&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
        const response = await fetch( "https://corsproxy.io/?" + encodeURIComponent(data));
        const result = await response.json();
        let a=result?.data?.cards[4]
        let b=a?.card?.card?.gridElements?.infoWithStyle?.restaurants
        let randomValue=Math.floor(Math.random() * 8);
        // It give random name  
        let differentRestName=b[randomValue]?.info?.name
       
        // setMenuData(placeName)
        // This is actual Menu data (Dropwon data after search part)
        setResInfo(swiggyDataFromJson?.data?.cards[2]?.card?.card?.info)
        setDiscountData(swiggyDataFromJson?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
        let actualMenu=(swiggyDataFromJson?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data)=>data?.card?.card?.itemCards || data?.card?.card?.categories)
        setMenuData(actualMenu)
        // It give random name from api (result)
        setDifferentRestName(differentRestName);

        
    }
    useEffect(()=>{
        fetchMenu()
    },[])

    function toogleFun(i){
        setCurrIndex(!currIndex);
    }


    // Restaurant menu wale search se main search pe navigte
    const navigate=useNavigate()
    function redirectToSearch(){
        navigate("/search");
    }

    return (
        <div className="w-full">
            <div className="w-[95%] md:w-[800px] mx-auto pt-10">
                {/* Home/faridabad... */}
                <p className="text-[12px] text-slate-500">
                    <Link to={"/"}><span className="hover:text-slate-700 cursor-pointer">Home</span></Link> / 
                    <Link to={"/"}><span className="hover:text-slate-700 cursor-pointer">{resInfo.city}</span></Link> /
                    <span className="text-slate-700 hover:cursor-pointer font-bold">{differentRestName}</span>
                </p>
                <h1 className="font-bold pt-6 text-2xl">{differentRestName}</h1>
                {/* Restrauant name ke neeche wali Card */}
                <div className="w-full h-[206px] bg-gradient-to-t px-4 pb-4 from-slate-200/70 rounded-[30px] mt-3">
                    <div className="w-full h-full border-slate-200/70 rounded-[30px] bg-white">
                      <div className="p-4 w-full">
                          <div className="flex items-center gap-2 font-semibold">
                                <i className="fi fi-sr-circle-star text-green-700"></i>
                                <span>{resInfo.avgRating}</span>
                                <span>({resInfo.totalRatingsString})</span>
                                •
                                <span>{resInfo.costForTwoMessage}</span>
                            </div>
                            <p className="underline font-semibold text-orange-500">{resInfo?.cuisines?.join(", ")}</p>
                            <div className="flex gap-2">
                                <div className="w-[7px] flex flex-col items-center justify-center">
                                    <div className="w-[7px] h-[7px] bg-gray-500 rounded-2xl"></div>
                                    <div className="w-[2px] h-[30px] bg-gray-500"></div>
                                    <div className="w-[7px] h-[7px] bg-gray-500 rounded-2xl"></div>
                                </div>
                                <div className="flex flex-col gap-2 font-semibold text-sm">
                                    <p>Outlet • <span className="text-gray-400">{resInfo.locality}</span></p>
                                    <p>{resInfo?.sla?.slaString}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className=" w-full">
                            <div className="flex item-center gap-5 p-3">
                                {/* Cylce logo */}
                                <i className="text-4xl fi fi-ss-biking"></i>
                                <span className="text-gray-400">{resInfo?.sla?.lastMileTravelString}</span> <span className="text-gray-400">Delivery Fees is Aplicable | Pay on Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Deals Part */}
                <div className="w-full overflow-hidden">
                    <div className="flex justify-between mt-8">
                        <h1 className="font-bold text-xl"> Deals for you </h1> 
                        <div className="flex gap-2 ">
                            <div onClick={handlePrev} className="rounded-full bg-gray-200 h-9 w-9 flex justify-center items-center cursor-pointer">
                                <i className="text-2xl mt-1 fi fi-rr-arrow-small-left"></i>
                            </div>
                            <div onClick={handleNext} className="rounded-full bg-gray-200 h-9 w-9 flex justify-center items-center cursor-pointer">
                                <i className="text-2xl mt-1 fi fi-rr-arrow-small-right"></i>
                            </div>
                        </div>
                    </div>
                   <div className="flex gap-4 mt-5">
                        {
                            discountData.map((data,i)=>(
                                <Discount data={data} key={i}/>

                            ))
                        }
                   </div>
                </div>
                {/* Menu Bar */}
                <h2 className="text-center mt-5 leading-5">Menu</h2>
                <div className="w-full mt-5 relative hover:cursor-pointer">
                    <div onClick={redirectToSearch} className="w-full p-3 font-semibold text-gray-600 bg-slate-200/70 rounded-xl text-center">Search for dishes</div>
                    <i className="fi fi-rr-search absolute top-3 right-3 text-xl"></i>
                </div>
                {/* Independent Drpodown wala part */}
                <div>
                        {
                            menuData.map(({card : {card}},i)=>(
                               <MenuCard card={card} key={i}/>
                            ))
                        }
                </div>
            </div>
        </div>
    )
}

function Discount({data:{info:{header,offerLogo,couponCode,description}}}){
    
    return(
       <div className="flex min-w-[328px] h-[76px] border p-3 rounded-2xl ">
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo} alt="" />
            <div>
                <h2 className="font-bold text-xl">{header}</h2>
                <p className="text-slate-500 text-sm">{couponCode ? couponCode : description}</p>
            </div>
       </div>
    )
}

function MenuCard({card}){

    let openOrNot=false;
    if(card["@type"]){
        openOrNot=true
    }

    const [isOpen,setIsOpen]=useState(openOrNot)

    function toggleDropDown(){
        setIsOpen((prev)=>!prev)
    }

    if(card?.itemCards){
        const {title,itemCards}=card
        return(
            <>
                <div className="mt-10">
                    <div className="flex justify-between">
                        <h1 className={"font-bold text-"+(card["@type"] ? "xl" : "base")}>{title}({itemCards.length})</h1>
                        <i className={"text-2xl fi fi-rr-angle-small-"+(isOpen? "up" : "down")} onClick={toggleDropDown}></i>
                    </div>
                    <div>
                        {
                            isOpen && <DetailMenu itemCards={itemCards}/> 
                        }
                    </div>
                </div>
                <hr className={`my-5 border-slate-200/70 ${card["@type"] ? "border-[10px]" : "border-[2px]"}`}/>
            </>
        )
    }
    else{
        const {title,categories}=card
        return(
            <div>
                <h1 className="font-bold text-xl">{card.title}</h1>
                {
                    categories.map((data,i)=>(
                        <MenuCard card={data} key={i}/>
                    ))
                }
            </div>
        )
    }
}

function DetailMenu({itemCards}){
    return(
        <div className="my-5">
            {
                itemCards.map(({card : {info}})=>{
                
                    const {name, price="29900", itemAttribute, ratings :{aggregatedRating :{rating="4.2",ratingCountV2="17"}}, description, imageId}=info
                    
                    // select specific slice from redux store


                    const [isMore,setIsMore]=useState(false)
                    let trimDesc=description.substring(0,140)
                   return (
                    
                   <div key={info.id} >
                    {/* Recomendation wala part */}
                        <div key={info.id} className="flex justify-between w-full min-h-[182px]">
                            <div className="w-[55%] md:w-[70%]">
                                <img className="w-5 rounded-sm" src={(itemAttribute && itemAttribute.vegClassifier==="VEG" ?vegIcon :nonVegIcon )} alt="" />
                                <h2 className="font-semibold text-xl">{name}</h2>
                                <p className="font-semibold text-xl">₹ {price/100}</p>
                                <p className="flex gap-2">
                                    <i className=" text-yellow-400 text-xl fi fi-ss-star"></i>
                                    <span>{rating} ({ratingCountV2})</span>
                                </p>
                                {
                                    description.length>140 ? <div>
                                        <span className="line-clamp-2 md:line-clamp-none text-sm ">{isMore ? description : trimDesc}</span> ...
                                        <button className="hidden md:block font-bold text-gray-500 hover:cursor-pointer" onClick={()=>setIsMore(!isMore)}>{isMore ? "less" : "more"}</button>
                                    </div> :  <span className=" text-sm ">{trimDesc}</span>
                                }
                            </div>
                            {/* Image and Image pe Add Button */}
                            <div className="w-[40%] md:w-[20%] relative h-full">
                                <img className="rounded-xl aspect-square hover:cursor-pointer " src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId } alt="" />
                                <AddToCartBtn info={info} key={info.id}/>
                                
                            </div>
                        </div>
                        <hr className="my-5 border-slate-200/70"/>
                   </div>
                )})
            }
        </div>
    )
}

export default RestaurantMenu