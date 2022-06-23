import React from "react";
import { Link, Navigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
import RecentChat from "../Components/RecentChat";
export default function NewBroadcastList() {
    const list = () => {
		let arr = [];
		for (let i = 0; i < 8; i++) {
				arr.push(<RecentChat />);
			}
		return arr;
	};
	return (
		<>
			<section className="flex justify-center items-center h-screen">
				<div className="rounded-lg p-7 flex flex-col justify-center myshadow" style={{ height: "500px", width: "500px" }}>
					<Link className="absolute crossbutton" to="/">
						<XCircleIcon className="h-8 w-8 text-blue-500" />
					</Link>
					<form action="" method="post" className="flex flex-col justify-between">
						<div className="flex justify-around">
							<label className="text-md font-medium mb-3 pt-2"> BroadCast list Name</label>
							<input
								className="rounded-lg myshadow h-9 w-60 mb-5 px-3 focus:outline-none text-sm font-light py-2"
								type="text"
								id="broadcastname"
								placeholder="Name of the BroadCast List"
								required
							></input>
						</div>
						<input
							className="rounded-lg myshadow h-9 w-60 mb-6 px-3 mx-auto mr-auto focus:outline-none text-sm font-light py-2"
							type="search"
							id="search"
							placeholder="Search Contact"
							required
						></input>
						<div className="overflow-auto mx-6 mb-5" style={{ height: "200px", width: "400px" }}>
							{list()}
						</div>
						<button className="rounded-full h-8 w-60 bg-yellow-400 mx-auto mt-3 text-sm mb-4">Save BroadCast List</button>
					</form>
				</div>
			</section>
		</>
	);
}
