import React from "react";
import { Link } from "react-router-dom";
import Base from "../Base";
export default function Settings() {
	return (
		<>
			<Base>
				<section className="flex justify-center items-center mt-20">
					<div className="rounded-lg p-7 flex flex-col justify-center panelShadow bg-white" style={{ height: "500px", width: "500px" }}>
						<h2 className="font-medium text-lg mb-3 text-center">To Receive Message Enter These Two Fields</h2>
						<form action="" method="post" className="flex flex-col justify-between">
							<label className="text-md font-medium mb-3">App ID</label>
							<input className="rounded-lg inputShadow h-9 w-full mb-6 px-3 text-sm font-light py-2" type="text" pattern="[6789][0-9]{9}" maxLength="10" placeholder="App ID" required />
							<label className="text-md font-medium mb-3">App Secret</label>
							<input className="rounded-lg inputShadow h-9 w-full mb-6 px-3 text-sm font-light py-2" type="text" id="wabaid" placeholder="App Secret" required />
							<button className="rounded-full h-8 w-60 bgOnButton mx-auto mt-3 text-sm mb-4">SAVE</button>
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
								<input className="rounded-lg h-5 w-5" type="checkbox" id="notifications" required />
								<label className="ml-5 text-lg">Enable Notifications</label>
							</div>
						</div>
					</div>
				</section>
			</Base>
		</>
	);
}
