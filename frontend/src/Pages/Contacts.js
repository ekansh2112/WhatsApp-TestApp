import React from "react";
import { Link } from "react-router-dom";
import { XCircleIcon, PlusIcon } from "@heroicons/react/solid";
import Contact from "../Components/Contact";
export default function Contacts() {
	const disp = () => {
		let arr = [];
		for (let i = 0; i < 12; i++) {
			arr.push(<Contact key={i} needMB={true} />);
		}
		return arr;
	};
	return (
		<>
			<section className="flex justify-center items-center h-screen">
				<div className="rounded-lg p-7 flex flex-col myshadow" style={{ height: "500px", width: "400px" }}>
					<Link className="fixed crossbutton" to="/">
						<XCircleIcon className="h-8 w-8" />
					</Link>
					<div className="flex flex-row justify-between w-full h-11 mb-6">
						<input className="rounded-lg myshadow h-full w-72 px-3 focus:outline-none text-sm font-light py-2" type="text" id="search" placeholder="Search for a contact" required></input>
						<Link className="rounded-full flex justify-center items-center h-11 w-11 bg-yellow-400" to="/newcontact">
							<PlusIcon className="h-6 w-6 inline" />
						</Link>
					</div>
					<div className="flex flex-col justify-start overflow-y-scroll w-full">{disp()}</div>
				</div>
			</section>
		</>
	);
}
