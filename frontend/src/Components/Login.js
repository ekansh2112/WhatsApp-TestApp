import React, { useState } from "react";
import { Link } from "react-router-dom";
import BusinessOwner from "../Assets/image.png";
export default function Login() {
	return (
		<>
			<div className="flex m-16 justify-between px-10 shadow-2xl rounded-lg bg-slate-300" style={{ height: "800px" }}>
				<div className="flex flex-col justify-center ml-16">
					<h2 className="font-semibold text-4xl mb-16">Login</h2>
					<label className="text-md mb-3">Your Mobile Number</label>
					<input className="rounded-lg h-8 w-60 mb-6 px-3 focus:outline-none text-sm font-light py-2" type="text" pattern="[6789][0-9]{9}" maxlength="10" id="number" required></input>
					<label className="text-md mb-3">Password</label>
					<input className="rounded-lg h-8 w-60 mb-12 px-3 focus:outline-none text-sm font-light py-2" type="password" id="password" required></input>
					<button className="rounded-full h-8 w-60 bg-yellow-400 text-sm mb-6">LOGIN</button>
					<div className="mt-4">
						<hr className="border-slate-400 mb-6"></hr>
						<p className="text-sm font-light">
							Haven't registered?&nbsp;
							<Link className="font-medium" to="/register">
								Register
							</Link>
						</p>
					</div>
				</div>
				<div className="flex">
					<img className="rounded-lg mr-16 mt-auto mb-auto" src={BusinessOwner} alt="Business Owner Communicating" />
				</div>
			</div>
		</>
	);
}
