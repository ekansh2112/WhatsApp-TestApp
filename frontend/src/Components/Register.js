import React, { useState } from "react";
export default function Register(){
    return(
        <>
            <div className="flex justify-center lg:p-10 md:p-5 h-full w-full bg-whit">
                <div  
                    style={{ height: "500px" }} 
                        className="flex  justify-between shadow-2xl w-full bg-slate-300 ">
                    <div 
                        className="flex justify-start p-10" 
                        style={{width:"500px"}}>
                        <div className="p-4 pt">
                            <h2 className="font-seira font-semibold text-2xl pb-1">
                                Register
                            </h2>
                            <p className="text-xs pb-4">
                                Before registering here, create a WhatsApp App in your Facebook Developer Account.
                            </p>
                            <label htmlFor="number" className=" font-semibold text-xs pb-2 focus:outline-none block  rounded-lg">
                                Your Mobile Number
                            </label>
                            <input 
                                maxLength={13}
                                type="tel"
                                id="number"
                                pattern="[0,9]{10}"
                                placeholder="123-45-678"
                                className="rounded px-1">
                            </input>
                            <label htmlFor="password" className="font-semibold text-xs pt-5 pb-2 focus:outline-none block rounded-lg">
                                WhatsApp Bussiness App ID
                            </label>
                            <input 
                                type=""
                                className="rounded px-1"
                                id="password">
                            </input>
                            <label htmlFor="password" className="font-semibold text-xs pt-5 pb-2 focus:outline-none block rounded-lg">
                                Permanent Access Token
                            </label>
                            <input 
                                type=""
                                className="rounded px-1"
                                id="password">
                            </input>
                            <div className="pt-5">
                                <button className=" p-1 rounded-lg w-40 mx-3 font-semibold bg-yellow-400 text-sm">
                                    REGISTER
                                </button>
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