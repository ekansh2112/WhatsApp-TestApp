import React from "react";
import { Link } from "react-router-dom";
import Base from "../Base";
export default function Settings() {
	return (
		<>
			<Base>
				<section className="flex justify-center items-center mt-20">
					<div className="rounded-lg p-7 flex flex-col justify-center panelShadow bg-white" style={{ height: "200px", width: "300px" }}>
						<div className="">
							<div className="flex justify-center items-center">
								<input className="rounded-lg h-5 w-5" type="checkbox" id="notifications" />
								<label className="ml-5 text-lg">Enable Notifications</label>
							</div>
						</div>
					</div>
				</section>
			</Base>
		</>
	);
}
