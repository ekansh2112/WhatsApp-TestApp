import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import List from "../Components/List";
import Base from "../Base";
export default function BroadcastLists({ ListOfBroadcastLists }) {
	const [listDetail, setListDetail] = useState(false);
	const [listTitle, setListTitle] = useState();
	return (
		<>
			<Base>
				{ListOfBroadcastLists?.length > 0 ? (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-row justify-center w-full h-11 mb-6">
									<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newbroadcastlist">
										<PlusIcon className="h-6 w-6 inline" />
									</Link>
								</div>
								<div className="flex flex-col justify-start h-full overflow-y-scroll removeScrollbar w-full">
									{ListOfBroadcastLists?.map((broadcastlist, index) => {
										return (
											<List
												key={index}
												broadcastlist={broadcastlist}
												needMB={index === ListOfBroadcastLists?.length - 1 ? true : false}
												listDetail={listDetail}
												setListDetail={setListDetail}
												listTitle={listTitle}
												setListTitle={setListTitle}
												fromBroadcastLists={true}
											/>
										);
									})}
								</div>
								{listDetail && (
									<button
										className="rounded-full h-10 w-24 bgOnButton mx-auto mt-3 text-sm"
										onClick={() => {
											setListTitle("");
											setListDetail(false);
										}}
									>
										BACK
									</button>
								)}
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
								<h1 className="text-center font-semibold text-lg capitalize">Add your first broadcast list now!</h1>
							</div>
						</section>
					</>
				)}
			</Base>
		</>
	);
}
