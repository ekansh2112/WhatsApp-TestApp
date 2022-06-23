import React from "react";
import { Link, Navigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
export default function NewContact() {
	return (
		<>
			<section className="flex justify-center items-center h-screen">
				<div className="rounded-lg p-7 flex flex-col justify-center myshadow" style={{ height: "500px", width: "500px" }}>
					<Link className="absolute crossbutton" to="/">
						<XCircleIcon className="h-8 w-8 text-blue-500" />
					</Link>
					<h2 className="font-medium text-xl mb-3 text-center">New Contact</h2>
					<form action="" method="post" className="flex flex-col justify-between">
						<div className="flex flex-row justify-between">
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">First Name</label>
								<input
									className="rounded-lg myshadow h-7 mb-3 px-3 focus:outline-none text-sm font-light py-2"
									type="text"
									pattern="[6789][0-9]{9}"
									maxLength="10"
									id="fname"
									placeholder="First Name"
									required
								></input>
							</div>
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">Last Name</label>
								<input
									className="rounded-lg myshadow h-7 mb-3 px-3 focus:outline-none text-sm font-light py-2"
									type="text"
									pattern="[6789][0-9]{9}"
									maxLength="10"
									id="lname"
									placeholder="Last Name"
									required
								></input>
							</div>
						</div>
						<label className="text-sm font-medium mb-1">Mobile Number</label>
						<input
							className="rounded-lg myshadow h-7 w-full mb-3 px-3 focus:outline-none text-sm font-light py-2"
							type="text"
							pattern="[6789][0-9]{9}"
							maxLength="10"
							placeholder="Mobile Number"
							id="mobile number"
							required
						></input>
						<label className="text-sm font-medium mb-1">Email Address</label>
						<input className="rounded-lg myshadow h-7 w-full mb-3 px-3 focus:outline-none text-sm font-light py-2" type="text" placeholder="eg: xyz@gmail.com" id="Email" required></input>
						<label className="text-sm font-medium mb-1">Address Line 1</label>
						<input className="rounded-lg myshadow h-7 w-full mb-3 px-3 focus:outline-none text-sm font-light py-2" type="text" id="address1" placeholder="Address Line 1" required></input>
						<label className="text-sm font-medium mb-1">Address Line 2</label>
						<input className="rounded-lg myshadow h-7 w-full mb-3 px-3 focus:outline-none text-sm font-light py-2" type="text" id="address2" placeholder="Address Line 2" required></input>
						<div className="flex flex-row justify-between">
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">Birthday</label>
								<input className="rounded-lg myshadow h-9 w-44 mb-3 px-3 focus:outline-none text-sm font-light py-2" type="date" id="birthday" required></input>
							</div>
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">Upload Profile Pic</label>
								<input className="rounded-lg myshadow h-9 w-44 mb-3 px-3 focus:outline-none text-sm font-light py-2" type="file" id="image"></input>
							</div>
						</div>
						<button className="rounded-full h-8 w-60 bg-yellow-400 mx-auto mt-3 text-sm mb-4">SAVE CONTACT</button>
					</form>
				</div>
			</section>
		</>
	);
}
