import React, { useState, useEffect } from "react";
import Contact from "../Components/Contact";
import Base from "../Base";
export default function NewMessage({ ListOfContacts }) {
	return (
		<>
			<Base>
				{ListOfContacts?.length > 0 ? (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<input className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3" type="text" placeholder="Type your message here" required />
								<input className="rounded-lg self-center inputShadow h-9 w-full mt-1 mb-5 px-3 text-xs font-light py-3" type="search" id="search" placeholder="Search for a contact" />
								<div className="flex flex-col justify-start overflow-y-scroll h-full removeScrollbar w-full">
									{ListOfContacts?.map((contact, index) => {
										return <Contact key={index} contact={contact} needMB={true} needCheckBox={true} />;
									})}
								</div>
								<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4">SEND MESSAGE</button>
							</div>
						</section>
					</>
				) : (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col justify-center panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<h1 className="text-center font-semibold text-lg capitalize">No contacts have been added yet!</h1>
							</div>
						</section>
					</>
				)}
			</Base>
		</>
	);
}
