import { Routes ,Route } from "react-router-dom";
import Navbar from "./Components/Head";
import Body from "./Components/Body";
import "@flaticon/flaticon-uicons/css/all/all.css";
// import RestaurantMenu from "./Components/RestaurantMenu";
import { CartContext, Visibility } from "./context/ContextApi";
import React, { lazy,Suspense, useEffect, useState } from "react";
// import Cart from "./Components/Cart";
import { useSelector } from "react-redux";
import LoginPage from "./Components/LoginBtn";
// import Search from "./Components/Search";


const Search=lazy(()=>import("./Components/Search"))
const Cart=lazy(()=>import("./Components/Cart"))
const RestaurantMenu=lazy(()=>import("./Components/RestaurantMenu"))
function App(){

    // Address ke time scrool nhai hone dega
    const visible=useSelector((state)=>state.toggleSlice.searchBarToggle)
    const loginVisible=useSelector((state)=>state.toggleSlice.loginToggle)

    return (
            <div className={ visible || loginVisible ? "overflow-hidden max-h-screen": ""}>
                <Suspense fallback="Loading...">
                    <Routes>
                        <Route path="/" element={<Navbar/>}>
                            <Route index element={<Body/>}/>
                            <Route path="/restaurantMenu/:id" element={<RestaurantMenu/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/search" element={ <Search/>}/>
                            <Route path="*" element={<h1>Coming Soon...</h1>}/>
                        </Route>
                    </Routes>
                </Suspense>
            </div>
    )
}
export default App;
