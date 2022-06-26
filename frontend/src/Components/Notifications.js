import React from "react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
export default function Notifications() {
    let Notification=()=>{
        let arr=[];
        for(let i=0;i<6;i++){
            arr.push(
				<div className="p-3 flex flex-row">
					<img
						className="w-14 h-14 rounded-full mr-3"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt="image_1"
					/>
					<div className="text-sm flex flex-col justify-center">
						<p className="text-gray-900 text-xs mb-2">John Smith</p>
						<p className="text-gray-600 text-xs">Hi! new mesaage</p>
					</div>
				</div>
			);
        }
        return arr;
    }
	return (
		<>
			<section className="flex justify-center items-center h-screen">
				<div className="rounded-lg p-7 flex flex-col justify-center myshadow" style={{ height: "500px", width: "300px" }}>
					<Link className="fixed crossbutton" to="/">
						<XCircleIcon className="h-8 w-8" />
					</Link>
					<button className="rounded-full h-8 w-32 bg-yellow-400 mx-auto mr-0 mt-3 text-xs font-medium">Mark as read</button>
					<div style={{ height: "400px" }} className="flex flex-col w-full justify-start overflow-auto mt-3 ">
                        {Notification()}
                    </div>
				</div>
			</section>
		</>
	);
}
