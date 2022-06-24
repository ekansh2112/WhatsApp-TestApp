import React from "react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
export default function NewContact() {
	return (
		<>
			<section className="flex justify-center items-center h-screen">
				<div className="rounded-lg p-7 flex flex-col justify-center myshadow" style={{ height: "550px", width: "450px" }}>
					<Link className="fixed crossbutton1" to="/">
						<XCircleIcon className="h-8 w-8" />
					</Link>
					<form action="" method="post" className="flex flex-col justify-between">
						<div className="flex flex-row justify-between">
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2">First Name</label>
								<input className="rounded-lg myshadow h-8 w-44 mb-4 px-3 focus:outline-none text-xs font-light py-3" type="text" id="fname" placeholder="First Name" required></input>
							</div>
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2">Last Name</label>
								<input className="rounded-lg myshadow h-8 w-44 mb-4 px-3 focus:outline-none text-xs font-light py-3" type="text" id="lname" placeholder="Last Name" required></input>
							</div>
						</div>
						<label className="text-sm font-normal mb-2">Mobile Number</label>
						<input
							className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3"
							type="text"
							pattern="[6789][0-9]{9}"
							maxLength="10"
							placeholder="Mobile Number"
							id="mobile number"
							required
						></input>
						<label className="text-sm font-normal mb-2">Email Address</label>
						<input className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3" type="text" placeholder="Email" id="Email"></input>
						<label className="text-sm font-normal mb-2">Address Line 1</label>
						<input className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3" type="text" id="address1" placeholder="Address Line 1"></input>
						<label className="text-sm font-normal mb-2">Address Line 2</label>
						<input className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3" type="text" id="address2" placeholder="Address Line 2"></input>
						<label className="text-sm font-normal mb-2">Birthday</label>
						<input className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3" type="date" id="birthday"></input>
						<button className="rounded-full h-8 w-60 bg-yellow-400 mx-auto mt-3 text-xs font-medium">SAVE CONTACT</button>
					</form>
				</div>
			</section>
		</>
	);
}
