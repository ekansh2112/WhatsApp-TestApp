import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "../Components/Contact";
import { toast } from "react-toastify";
import { deleteContact } from "../data/Contacts";
import Base from "../Base";
export default function DeleteContacts({ ListOfContacts }) {
	const navigate = useNavigate();
	const removeContact = (e) => {
		e.preventDefault();
		deleteContact({ phone: "7290941111" })
			.then((data) => {
				if (data?.stat === "success") {
					toast.success(data?.message);
					navigate("/");
				} else if (data?.stat === "error") {
					return toast.error(data?.message);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<>
			<Base>
				<section className="flex justify-center items-center mt-20">
					<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
						<input className="rounded-lg self-center inputShadow h-9 w-full mt-1 mb-5 px-3 text-xs font-light py-3" type="search" id="search" placeholder="Search for a contact" />
						<div className="flex flex-col justify-start overflow-y-scroll removeScrollbar w-full">
							{ListOfContacts?.map((contact, index) => {
								console.log(contact, "abc");
								return <Contact key={index} contact={contact} needMB={true} needCheckBox={true} />;
							})}
						</div>
						<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4" onClick={removeContact}>
							DELETE
						</button>
					</div>
				</section>
			</Base>
		</>
	);
}
