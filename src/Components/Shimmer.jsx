import React from "react";

function Shimmer(){
    return (
        <div className="w-full">
            <div className="w-full text-white flex justify-center items-center gap-5 flex-col h-[300px] bg-slate-900">
               <div className="relative flex items-center">
                    <img className="w-20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
                    <span className="loader"></span>
               </div>
                <h1 className="text-3xl">Looking for great food near you</h1>
            </div>
            <div className="w-[80%] mx-auto pt-3 flex flex-wrap gap-10">
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="w-[250px] h-[150px] bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
        </div>
    )
}

export default Shimmer