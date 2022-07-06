import React, { useState, useEffect } from "react";
import Contact from "../Components/Contact";
import { contactList } from "../helpers/contacts/contacts";
import Base from "../Base";
export default function NewBroadcastList() {
	const [Contacts, setContacts] = useState([]);
	useEffect(() => {
		contactList().then((data) => {
			setContacts(data);
		});
	}, []);
	const disp = () => {
		let arr = [];
		Contacts.map((contact, index) => {
			console.log(contact, "abc");
			arr.push(<Contact key={index} contact={contact} needMB={true} needCheckBox={true} />);
		});
		return arr;
	};
	return (
		<>
			<Base>
				<section className="flex justify-center items-center h-screen">
					<div className="rounded-lg p-7 flex flex-col panelShadow" style={{ height: "500px", width: "400px" }}>
						<div className="flex flex-col">
							<label className="text-sm font-normal mb-2">Broadcast List Name</label>
							<input className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3" type="text" id="bclname" placeholder="Name of the broadcast list" required />
						</div>
						<input className="rounded-lg self-center inputShadow h-9 w-full mt-1 mb-5 px-3 text-xs font-light py-3" type="search" id="search" placeholder="Search for a contact" />
						<div className="flex flex-col justify-start overflow-y-scroll w-full">{disp()}</div>
						<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4">SAVE BROADCAST LIST</button>
					</div>
				</section>
			</Base>
		</>
	);
}
