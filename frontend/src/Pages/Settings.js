import React from "react";
import { Link, Navigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
export default function Settings() {
	return (
		<>
			<section className="flex justify-center items-center h-screen">
				<div className="rounded-lg p-7 flex flex-col justify-center myshadow" style={{ height: "500px", width: "500px" }}>
					<Link className="absolute crossbutton" to="/">
						<XCircleIcon className="h-8 w-8 text-blue-500" />
					</Link>
					<h2 className="font-medium text-lg mb-3 text-center">To Receive Message Enter These Two Fields</h2>
					<form action="" method="post" className="flex flex-col justify-between">
						<label className="text-md font-medium mb-3">App ID</label>
						<input
							className="rounded-lg myshadow h-9 w-full mb-6 px-3 focus:outline-none text-sm font-light py-2"
							type="text"
							pattern="[6789][0-9]{9}"
							maxLength="10"
							id="number"
							placeholder="App ID"
							required
						></input>
						<label className="text-md font-medium mb-3">App Secret</label>
						<input className="rounded-lg myshadow h-9 w-full mb-6 px-3 focus:outline-none text-sm font-light py-2" type="text" id="wabaid" placeholder="App Secret" required></input>
						<button className="rounded-full h-8 w-60 bg-yellow-400 mx-auto mt-3 text-sm mb-4">SAVE</button>
					</form>
					<div className="mb-6 mt-3">
						<hr className="border-slate-400 w-full mb-6"></hr>
						<p className="text-sm text-center font-light">
							Don't know how to create these?&nbsp;
							<Link className="font-medium" to="/">
								Click Here
							</Link>
						</p>
					</div>
					<div className="">
						<hr className="border-slate-400 w-full mb-6"></hr>
						<div className="flex justify-center items-center">
							<input className="rounded-lg h-5 w-5 focus:outline-none" type="checkbox" id="notifications" required></input>
							<label className="ml-5 text-lg">Enable Notifications</label>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
