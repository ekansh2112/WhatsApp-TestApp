import React from "react";
import { Link } from "react-router-dom";
import BusinessOwner from "../Assets/image.png";
export default function Login() {
	return (
		<>
			<div className="flex m-16 justify-between px-10 myshadow rounded-lg bg-slate-300" style={{ height: "650px" }}>
				<div className="flex flex-col justify-center ml-16">
					<h2 className="font-semibold text-4xl mb-3">Register</h2>
					<p className="font-light text-sm mb-6">Before registering here, create an WhatsApp App in you Facebook Developer Account.</p>
					<label className="text-md mb-3">Your Mobile Number</label>
					<input className="rounded-lg h-8 w-60 mb-3 px-3 focus:outline-none text-sm font-light py-2" type="text" pattern="[6789][0-9]{9}" maxLength="10" id="number" required></input>
					<label className="text-md mb-3">WhatsApp Business App ID (WABA ID)</label>
					<input className="rounded-lg h-8 w-60 mb-3 px-3 focus:outline-none text-sm font-light py-2" type="text" id="wabaid" required></input>
					<label className="text-md mb-3">Permanent Access Token</label>
					<input className="rounded-lg h-8 w-60 mb-3 px-3 focus:outline-none text-sm font-light py-2" type="text" id="patoken" required></input>
					<label className="text-md mb-3">Create Password</label>
					<input className="rounded-lg h-8 w-60 mb-6 px-3 focus:outline-none text-sm font-light py-2" type="text" id="password" required></input>
					<button className="rounded-full h-8 w-60 bg-yellow-400 text-sm mb-4">REGISTER</button>
					<div className="my-4">
						<hr className="border-slate-400 w-72 mb-4"></hr>
						<p className="text-sm font-light">
							Don't know how to create these?&nbsp;
							<Link className="font-medium" to="/login">
								Click Here
							</Link>
						</p>
					</div>
					<div className="">
						<hr className="border-slate-400 w-72 mb-4"></hr>
						<p className="text-sm font-light">
							Already registered?&nbsp;
							<Link className="font-medium" to="/login">
								Login
							</Link>
						</p>
					</div>
				</div>
				<div className="flex">
					<img className="rounded-lg mr-16 my-12" src={BusinessOwner} alt="Business Owner Communicating" />
				</div>
			</div>
		</>
	);
}
