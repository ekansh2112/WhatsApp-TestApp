import React, { useState } from "react";
export default function Login(){
    return(
        <>
            <div className="flex justify-center lg:p-10 md:p-5 h-full w-full bg-whit">
                <div  
                    style={{ height: "500px" }} 
                        className="flex  justify-between shadow-2xl w-full bg-slate-300 ">
                    <div 
                        className="flex justify-start p-10" 
                        style={{width:"400px"}}>
                        <div className="p-4 pt-20">
                            <h2 className="font-seira font-semibold text-4xl pb-10">
                                Login.
                            </h2>
                            <label htmlFor="number" className=" font-semibold text-sm pb-2 focus:outline-none block sm:text-sm rounded-lg">
                                Your Mobile Number
                            </label>
                            <input 
                                type="tel"
                                maxLength={13}
                                id="number"
                                pattern="[0,9]{10}"
                                placeholder="123-45-678"
                                className="rounded px-1">
                            </input>
                            <label htmlFor="password" className="font-semibold text-sm pt-5 pb-2 focus:outline-none block sm:text-sm rounded-lg">
                                Password
                            </label>
                            <input 
                                type="password"
                                className="rounded px-1"
                                id="password">
                            </input>
                            <div className="pt-5">
                                <button className=" p-1 rounded-lg w-full font-semibold bg-yellow-400 text-lg">
                                    LOGIN
                                </button>
                            </div>
                            <div className="pt-4">
                                <hr className=" bg-black">
                                </hr>
                                <p className="text-sm">
                                    Haven't registered? 
                                    <button className="font-semibold">
                                         Register
                                    </button>
                                    .
                                </p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex justify-center w-40" style={{width:"600px"}}>
                        <img
					        className="w-60 h-80 rounded mt-auto mb-auto"
					        src="https://th.bing.com/th/id/OIP.G3QzFoqyxCLGIFkVxiH65AHaMG?pid=ImgDet&rs=1"
					        alt="Avatar of Writer"
				        />
                    </div>
                </div>
            </div>
        </>
    )
}