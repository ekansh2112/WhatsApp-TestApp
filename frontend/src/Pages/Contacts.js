import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Contact from "../Components/Contact";
import Base from "../Base";
export default function Contacts({ ListOfContacts }) {
	return (
		<>
			<Base>
				{ListOfContacts?.length > 0 ? (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-row justify-between w-full h-11 mb-6">
									<input className="rounded-lg inputShadow h-full w-72 px-3 text-sm font-light py-2" type="text" id="search" placeholder="Search for a contact" required />
									<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newcontact">
										<PlusIcon className="h-6 w-6 inline" />
									</Link>
								</div>
								<div className="flex flex-col justify-start overflow-y-scroll w-full">
									{ListOfContacts?.map((contact, index) => {
										return <Contact key={index} contact={contact} needMB={true} needCheckBox={true} />;
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
