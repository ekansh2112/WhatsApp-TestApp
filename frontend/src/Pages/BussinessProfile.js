import React, { useState } from "react";
import { CloudUploadIcon } from "@heroicons/react/solid";
import ProfilePic from "../Assets/ProfilePic.png";
import Base from "../Base";
export default function BusinessProfile() {
	const [imageEdit, setImageEdit] = useState(false);
	return (
		<>
			<Base>
				<section className="flex justify-center items-center mt-16">
					<div className="rounded-lg px-9 py-7 flex flex-col justify-center panelShadow bg-white" style={{ height: "575px", width: "450px" }}>
						<div className="flex flex-row justify-between items-center mb-6">
							<div className="flex flex-col">
								<label className="text-sm font-normal text-slate-900 mb-1">Name</label>
								<input className="h-8 mb-4 focus:outline-none text-sm font-medium py-3" type="text" id="businessname" defaultValue="The Garage Shop" readOnly></input>
								<label className="text-sm font-normal text-slate-900 mb-1">Mobile Number</label>
								<input className="h-8 focus:outline-none text-sm font-medium py-3" type="text" id="mobilenumber" defaultValue="+919871234580" readOnly></input>
							</div>
							<div className="flex justify-center">
								<label htmlFor="photo-upload" className="cursor-pointer rounded-full">
									<div className="img-wrap img-upload">
										<CloudUploadIcon className="uploadbutton" />
										<img className="w-auto h-full" for="photo-upload" src={ProfilePic} alt="Profile_Pic" />
									</div>
									<input style={{ display: "none" }} id="photo-upload" type="file" />
								</label>
							</div>
							{imageEdit && (
								<div>
									<button className="rounded-lg h-8 w-12 bg-yellow-400 text-xs font-medium">SAVE</button>
								</div>
							)}
						</div>
						<form action="" method="post" className="flex flex-col justify-between">
							<label className="text-sm font-normal text-slate-900 mb-2">Description</label>
							<input
								className="rounded-lg inputShadow h-9 w-full mb-4 px-3 focus:outline-none text-xs font-medium py-3"
								type="text"
								id="description"
								placeholder="Add description"
							></input>
							<label className="text-sm font-normal text-slate-900 mb-2">Address</label>
							<input className="rounded-lg inputShadow h-9 w-full mb-4 px-3 focus:outline-none text-xs font-medium py-3" type="text" id="address" placeholder="Add your address"></input>
							<label className="text-sm font-normal text-slate-900 mb-2">Email</label>
							<input className="rounded-lg inputShadow h-9 w-full mb-4 px-3 focus:outline-none text-xs font-medium py-3" type="email" id="email" placeholder="Add your email"></input>
							<div className="flex flex-row justify-between">
								<div className="flex flex-col">
									<label className="text-sm font-normal text-slate-900 mb-2">Vertical</label>
									<select className="rounded-lg myselect inputShadow h-9 w-44 mb-4 px-3 focus:outline-none text-xs font-medium" name="vertical">
										<option value="Auto">Auto</option>
										<option value="Electronics">Electronics</option>
										<option value="Grocery">Grocery</option>
										<option value="Home Appliances">Home Appliances</option>
									</select>
								</div>
								<div className="flex flex-col">
									<label className="text-sm font-normal text-slate-900 mb-2">Website</label>
									<input className="rounded-lg inputShadow h-9 w-44 mb-4 px-3 focus:outline-none text-xs font-medium py-3" type="url" placeholder="Add your website"></input>
								</div>
							</div>
							<button className="rounded-full h-8 w-60 bg-yellow-400 mx-auto mt-3 text-xs font-medium">UPDATE PROFILE</button>
						</form>
					</div>
				</section>
			</Base>
		</>
	);
}
