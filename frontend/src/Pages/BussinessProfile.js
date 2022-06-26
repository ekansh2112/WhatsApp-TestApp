import React from "react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
export default function BusinessProfile() {
	return (
		<>
			<section className="flex justify-center items-center h-screen">
				<div className="rounded-lg p-7 flex flex-col justify-center myshadow" style={{ height: "550px", width: "450px" }}>
					<Link className="fixed crossbutton1" to="/">
						<XCircleIcon className="h-8 w-8" />
					</Link>
					<form action="" method="post" className="flex flex-col justify-between">
						<label className="text-sm  font-semibold mb-2">Business Name</label>
						<input className="rounded-lg myshadow h-8 w-f mb-4 px-3 focus:outline-none text-xs font-semibold py-3" type="text" id="businessname" defaultValue="Ramesh" required></input>

						<label className="text-sm font-semibold mb-2">Mobile Number (Not editable)</label>
						<input
							className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-semibold py-3"
							type="text"
							pattern="[6789][0-9]{9}"
							maxLength="10"
							defaultValue="+919871234580"
							id="mobile number"
							disabled
						></input>
						<label className="text-sm font-semibold mb-2">Description</label>
						<input
							className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-semibold py-3"
							type="text"
							defaultValue="hi! using whatsapp bsp"
							id="description"
						></input>
						<label className="text-sm font-normal mb-2">Address</label>
						<input className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-semibold py-3" type="text" id="address" defaultValue="a2/345, Delhi"></input>
						<label className="text-sm font-normal mb-2">Email</label>
						<input className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-semibold py-3" type="email" id="email" defaultValue="xyx@gmail.com"></input>
						<div className="flex flex-row justify-between">
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2">Vertical</label>
								<select name="vertical" className="rounded-lg myshadow h-8 w-44 mb-4 px-3 focus:outline-none text-xs font-semibold" defaultValue="">
									<option value="Auto">Auto</option>
									<option value="Electronics">Electronics</option>
									<option value="Grocery">Grocery</option>
									<option value="Home Appliances">Home Appliances</option>
								</select>
							</div>
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2">Bussiness Website</label>
								<input className="rounded-lg myshadow h-8 w-44 mb-4 px-3 focus:outline-none text-xs font-semibold py-3" type="text" defaultValue="www.kfh.com"></input>
							</div>
						</div>
						<button className="rounded-full h-8 w-60 bg-yellow-400 mx-auto mt-3 text-xs font-medium">UPDATE PROFILE</button>
					</form>
				</div>
			</section>
		</>
	);
}
