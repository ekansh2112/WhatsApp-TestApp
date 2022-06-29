import React from "react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
import Contact from "../Components/Contact";
export default function NewMessage() {
	const disp = () => {
		let arr = [];
		for (let i = 0; i < 12; i++) {
			arr.push(<Contact key={i} needMB={true} needRadio={true} />);
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
					<div className="flex flex-col">
						<input
							className="rounded-lg myshadow h-9 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3"
							type="text"
							id="newmessage"
							placeholder="Message"
							required
						></input>
					</div>
					<input
						className="rounded-lg self-center myshadow h-9 w-full mt-1 mb-5 px-3 focus:outline-none text-xs font-light py-3"
						type="search"
						id="search"
						placeholder="Search for a contact"
					></input>
					<div className="flex flex-col justify-start overflow-y-scroll w-full">{disp()}</div>
					<button className="rounded-full flex items-center justify-center h-8 w-60 bg-yellow-400 mx-auto mt-6 text-xs font-medium py-4">SEND MESSAGE</button>
				</div>
			</section>
		</>
	);
}
