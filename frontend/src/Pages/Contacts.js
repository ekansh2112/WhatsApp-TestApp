import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Contact from "../Components/Contact";
import { contactList } from "../helpers/contacts/contacts";
import Base from "../Base";
export default function Contacts() {
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
				<section className="flex justify-center items-center mt-20">
					<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
						<div className="flex flex-row justify-between w-full h-11 mb-6">
							<input className="rounded-lg inputShadow h-full w-72 px-3 text-sm font-light py-2" type="text" id="search" placeholder="Search for a contact" required />
							<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newcontact">
								<PlusIcon className="h-6 w-6 inline" />
							</Link>
						</div>
						<div className="flex flex-col justify-start overflow-y-scroll w-full">{disp()}</div>
					</div>
				</section>
			</Base>
		</>
	);
}
