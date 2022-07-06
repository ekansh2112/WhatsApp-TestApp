import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Contact from "../Components/Contact";
import Base from "../Base";
export default function NewBroadcastList({ ListOfContacts }) {
	return (
		<>
			<Base>
				{ListOfContacts?.length > 0 ? (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-col">
									<label className="text-sm font-normal mb-2">Broadcast List Name</label>
									<input className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3" type="text" id="bclname" placeholder="Name of the broadcast list" required />
								</div>
								<input className="rounded-lg self-center inputShadow h-9 w-full mt-1 mb-5 px-3 text-xs font-light py-3" type="search" id="search" placeholder="Search for a contact" />
								<div className="flex flex-col justify-start overflow-y-scroll removeScrollbar w-full">
									{ListOfContacts?.map((contact, index) => {
										return <Contact key={index} contact={contact} needMB={true} needCheckBox={true} />;
									})}
								</div>
								<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4">SAVE BROADCAST LIST</button>
							</div>
						</section>
					</>
				) : (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col justify-center panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-row justify-center w-full h-11 mb-6">
									<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newcontact">
										<PlusIcon className="h-6 w-6 inline" />
									</Link>
								</div>
								<h1 className="text-center font-semibold text-lg capitalize">Add your first contact now!</h1>
							</div>
						</section>
					</>
				)}
			</Base>
		</>
	);
}
