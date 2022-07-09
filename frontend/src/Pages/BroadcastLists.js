import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import List from "../Components/List";
import Base from "../Base";
import { searchBroadcastList } from "../data/BroadcastLists";
export default function BroadcastLists({ ListOfBroadcastLists }) {
	const [res, setres] = useState(false);
	const [result, setresult] = useState({
		title: "",
	});
	const handleChange = (name) => (event) => {
		setsearch(event.target.value);
	};
	const setsearch = (value) => {
		if (value.length != 0) {
			console.log(value);
			searchBroadcastList({ title: value })
				.then((data) => {
					console.log(data, "xyz");
					setresult({
						title: data[0].title,
					});
					setres(true);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			setres(false);
		}
	};
	console.log(result, "qwerty");
	return (
		<>
			<Base>
				{ListOfBroadcastLists?.length > 0 ? (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-row justify-between w-full h-11 mb-6">
									<input
										className="rounded-lg inputShadow h-full w-72 px-3 text-sm font-light py-2"
										type="text"
										id="search"
										onChange={handleChange("list")}
										placeholder="Search for a broadcast list"
									/>
									<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newbroadcastlist">
										<PlusIcon className="h-6 w-6 inline" />
									</Link>
								</div>
								<div className="flex flex-col justify-start h-full overflow-y-scroll removeScrollbar w-full">
									{ListOfBroadcastLists?.map((broadcastlist, index) => {
										return <List key={index} broadcastlist={broadcastlist} needMB={index === ListOfBroadcastLists?.length - 1 ? true : false} />;
									})}
								</div>
							</div>
						</section>
					</>
				) : (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col justify-center panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-row justify-center w-full h-11 mb-6">
									<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newbroadcastlist">
										<PlusIcon className="h-6 w-6 inline" />
									</Link>
								</div>
								<h1 className="text-center font-semibold text-lg capitalize">Add your first broadcastlist now!</h1>
							</div>
						</section>
					</>
				)}
			</Base>
		</>
	);
}
