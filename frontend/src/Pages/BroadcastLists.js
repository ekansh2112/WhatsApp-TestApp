import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import List from "../Components/List";
import Base from "../Base";
export default function BroadcastLists() {
	const disp = () => {
		let arr = [];
		for (let i = 0; i < 12; i++) {
			arr.push(<List key={i} needMB={true} />);
		}
		return arr;
	};
	return (
		<>
			<Base>
				<section className="flex justify-center items-center mt-20">
					<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
						<div className="flex flex-row justify-between w-full h-11 mb-6">
							<input className="rounded-lg inputShadow h-full w-72 px-3 text-sm font-light py-2" type="text" id="search" placeholder="Search for a list" required />
							<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newbroadcastlist">
								<PlusIcon className="h-6 w-6 inline" />
							</Link>
						</div>
						<div className="flex flex-col justify-start overflow-y-scroll removeScrollbar w-full">{disp()}</div>
					</div>
				</section>
			</Base>
		</>
	);
}
