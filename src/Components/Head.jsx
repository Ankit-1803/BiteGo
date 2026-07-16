import { createContext, useContext, useState } from "react";
import { data, Outlet,Link } from "react-router-dom";
import { CartContext, Visibility } from "../context/ContextApi";
import Locations from "./Locations.json";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSearchBar } from "../utils/toggleSlice";
import LoginBtn from "./LoginBtn";
import appLogo from "./assets/AppLogo.png"
function Navbar() {
    let navItems=[
        {
            name:"Search",
            image:"fi-rs-search",
            path:"/search"
        },
        {
            name:"Login",
            image: "fi-sr-user",
            path:"/login"
        },
        {
            name:"Cart",
            image:"fi-rr-shopping-cart",
            path:"/cart"
        }
    ]

    const cartData=useSelector((state)=>state.cartSlice.cartItems)
    const userData=useSelector((state)=>state.authSlice.userData)

    // Redux Toolkit
    // Access data from redux store by useSelector Hook
    const visible=useSelector((state)=>state.toggleSlice.searchBarToggle)
    const loginVisible=useSelector((state)=>state.toggleSlice.loginToggle)
    // Upadte state to redux store by useDispatch Hook
    const dispatch=useDispatch()
   

    const [searchResult,setSearchResult]=useState([])
    const [address,setAddress]=useState("")


     function handleVisibility(){
        
        dispatch(toggleSearchBar())
    }
     function handleLogin(){
        
        dispatch(toggleLogin())
    }

    
    
 function searchResultFun(val) {
    if (val.trim() === "") {
        setSearchResult([]);
        return;
    }
    
    const filtered = Locations.filter((location) =>
        location.place.toLowerCase().includes(val.toLowerCase()) ||
    location.address.toLowerCase().includes(val.toLowerCase()) ||
    location.description.toLowerCase().includes(val.toLowerCase())
);

    setSearchResult(filtered);
    if (filtered.length > 0) setAddress(filtered);
}


    return (
       <>
            {/* Address slider at Other from left to right*/}
            <div className="w-full">
                    <div onClick={handleVisibility} className={"w-full bg-black/50 z-30 h-full absolute  " + (visible ? "visible" : "invisible")}></div>
                    <div className={"bg-white w-full md:w-[37%] flex justify-end h-full z-40 absolute duration-500 " + (visible ? "left-0" : "-left-[100%]")}>
                        <div className="flex flex-col w-[66%] mr-8 mt-5 gap-4">
                            <i className="text-xl font-light fi fi-rr-cross hover:cursor-pointer" onClick={handleVisibility}></i>
                            <input type="text" placeholder="Search city name or place..." className="border p-5 focus:outline-none focus:shadow-lg mt-8  " onChange={(e)=>searchResultFun(e.target.value)} />
                            <div className=" p-2 overflow-scroll">
                                <ul>
                                    {
                                        searchResult.map((data,i)=>(
                                        <div className="my-5" key={i}>
                                                <div className="flex gap-3">
                                                    <i className="fi fi-rs-marker mt-1"></i>
                                                    <li key={data.id} className="border-b border-gray-200  hover:bg-gray-100 cursor-pointer" onClick={() => { setAddress(data);  setSearchResult([]);  }}>
                                                        <h2 className="font-bold text-lg">{data.place}</h2>
                                                        <p className="text-gray-700">{data.address}</p>
                                                        <p className="text-sm text-gray-500">{data.description}</p>
                                                    </li>
                                                </div>
                                        </div>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>

            {/* Login slider from right to left */}
            <div className="w-full">
                    <div onClick={handleLogin} className={"w-full bg-black/50 z-30 h-full absolute  " + (loginVisible ? "visible" : "invisible")}></div>
                    <div className={"bg-white w-full md:w-[37%] flex h-full z-40 fixed duration-500 " + (loginVisible ? "right-0" : "-right-[100%]")}>
                        <div className="m-5 w-[70%]">
                            <i className="text-xl font-light fi fi-rr-cross hover:cursor-pointer" onClick={handleLogin}></i>
                            <div className="my-8 w-full flex justify-between items-center">
                                <h1 className="font text-3xl">Login</h1>
                                <img className="w-25" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                            </div>
                            <LoginBtn/>
                            
                            <p className="text-sm mt-2 opacity-70">By clicking on Login, I accept the <strong className="hover:cursor-pointer">Terms & Conditions</strong> & <strong className="hover:cursor-pointer">Privacy Policy</strong></p>
                        </div>
                    </div>
            </div>

            <div className="relative w-full">
                <div className="sticky top-0 z-20 w-full h-20 bg-white shadow-md flex justify-center items-center">
                    <div className="flex items-center w-full sm:w-[90%] lg:w-[80%] justify-between">

                        {/* App Logo */}
                        <div className="flex items-center gap-10">

                            <Link to="/">
                                <div className="w-50 cursor-pointer">
                                    <img
                                    src={appLogo}
                                    alt="App Logo"/>
                                </div>
                            </Link>


                            <div className="flex items-center gap-1.5 hover:cursor-pointer" onClick={handleVisibility}>
                                <p className="flex items-center">
                                    <span className="font-bold border-b-2 border-black">Other</span>
                                    <span className="ml-2 text-sm opacity-85 line-clamp-1">{address?.description}</span>
                                </p>
                                <i className="mt-2 text-2xl text-orange-400 fi fi-rr-angle-small-down"></i>
                            </div>
                        </div>

                                
                        {/* Navbar ke items render ho rahe hai and also login credentials render honge login hone par */}
                        <div className=" hidden md:flex items-center gap-2 md:gap-7 justify-between ">
                            {
                                navItems.map((data,i)=>(

                                    data.name == "Login" ? 
                                    <div onClick={handleLogin} key={data.path}>
                                        <div className="flex items-center gap-2 hover:cursor-pointer " key={i}>
                                            {
                                                userData ? <img className="w-15 h-15 rounded-xl" src={userData.photo} alt="profile photo" onError={(e) => {e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";}}/> : 
                                                <i className={"mt-1 fi "+data.image}></i>
                                            }
                                            <p>{userData ? userData.name : data.name}</p>
                                            {
                                                cartData.length!=0 &&  data.name==="Cart" &&  <p>{cartData.length}</p>
                                            }
                                        </div> 
                                    </div>
                                    :
                                    <Link to={data.path} key={data.path}>
                                        <div className="flex items-center gap-2 hover:cursor-pointer " key={i}>
                                            <i className={"mt-1 fi "+data.image}></i>
                                            <p>{data.name}</p>
                                            {
                                                cartData.length!=0 &&  data.name==="Cart" &&  <p>{cartData.length}</p>
                                            }
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                            

                            {/* This is for Responsive Perpose */}
                        <div className="flex items-center md:hidden gap-4 mr-4">
                            {
                                navItems.map(data=>(
                                    data.name == "Login" ? (
                                        <div onClick={handleLogin} key={data.path}>
                                            <i className={"mt-1 fi "+data.image}></i>
                                        </div>
                                    ) :
                                    <Link to={data.path} key={data.path}>
                                        <i className={"mt-1 fi "+data.image}></i>
                                        {
                                            data.name === "Cart" && <span>{cartData.length}</span>
                                        }
                                        
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <Outlet/>   
            </div>
       </>
    );
}
export default Navbar;