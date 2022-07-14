import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Contact from "../Components/Contact";
import { searchContact } from "../data/Contacts";
import Base from "../Base";
export default function Contacts({ ListOfContacts }) {
	const [contactDetail, setContactDetail] = useState(false);
	const [conNumber, setConNumber] = useState();
	const [res, setres] = useState(false);
	const [result, setresult] = useState({
		phoneNumber: "",
		fname: "",
		lname: "",
		image: "",
	});
	const handleChange = (name) => (event) => {
		setsearch(event.target.value);
	};
	const setsearch = (value) => {
		if (value.length === 10) {
			searchContact({ phoneNumber: value })
				.then((data) => {
					setresult({
						phoneNumber: data[0].phoneNumber,
						fname: data[0].fname,
						lname: data[0].lname,
						image: data[0].image,
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
	return (
		<>
			<Base>
				{ListOfContacts?.length > 0 && contactDetail === false ? (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-row justify-between w-full h-11 mb-6">
									<input
										className="rounded-lg inputShadow h-full w-72 px-3 text-sm font-light py-2"
										type="text"
										name="search"
										onChange={handleChange("search")}
										placeholder="Search for a contact"
									/>
									<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newcontact">
										<PlusIcon className="h-6 w-6 inline" />
									</Link>
								</div>
								<div className="flex flex-col justify-start h-full overflow-y-scroll removeScrollbar w-full">
									{res === true ? (
										<Contact
											contact={result}
											contactDetail={contactDetail}
											setContactDetail={setContactDetail}
											conNumber={conNumber}
											setConNumber={setConNumber}
											fromContactList={true}
										/>
									) : (
										ListOfContacts?.map((contact, index) => {
											return (
												<Contact
													key={index}
													contact={contact}
													needMB={index === ListOfContacts?.length - 1 ? true : false}
													contactDetail={contactDetail}
													setContactDetail={setContactDetail}
													conNumber={conNumber}
													setConNumber={setConNumber}
													fromContactList={true}
												/>
											);
										})
									)}
								</div>
							</div>
						</section>
					</>
				) : contactDetail ? (
					ListOfContacts?.map(
						(contact, index) =>
							contact.phoneNumber === conNumber && (
								<section key={index} className="flex justify-center items-center mt-20">
									<div className="rounded-lg py-7 px-10 flex flex-col justify-center panelShadow bg-white" style={{ height: "550px", width: "500px" }}>
										<div className="flex flex-row justify-between">
											<div className="flex flex-col">
												<label className="text-sm font-normal mb-2" htmlFor="firstname">
													First Name
												</label>
												<input className="rounded-lg inputShadow h-9 w-44 mb-4 px-3 text-xs font-light py-3" type="text" readOnly name="firstname" value={contact.fname} />
											</div>
											<div className="flex flex-col">
												<label className="text-sm font-normal mb-2" htmlFor="lastname">
													Last Name
												</label>
												<input className="rounded-lg inputShadow h-9 w-44 mb-4 px-3 text-xs font-light py-3" type="text" readOnly name="lastname" value={contact.lname} />
											</div>
										</div>
										<label className="text-sm font-normal mb-2" htmlFor="mobilenumber">
											Mobile Number
										</label>
										<input
											className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3"
											type="text"
											readOnly
											name="mobilenumber"
											value={contact.phoneNumber.slice(2)}
										/>
										<label className="text-sm font-normal mb-2" htmlFor="email">
											Email Address
										</label>
										<input className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3" type="text" readOnly name="email" value={contact.email} />
										<label className="text-sm font-normal mb-2" htmlFor="address">
											Address
										</label>
										<input className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3" type="text" readOnly name="address" value={contact.address} />
										<label className="text-sm font-normal mb-2" htmlFor="birthday">
											Birthday
										</label>
										<input
											className="rounded-lg inputShadow h-9 w-full mb-7 px-3 text-xs font-light py-3"
											type="date"
											readOnly
											name="birthday"
											value={contact?.dob?.substring(0, 10)}
										/>
										<button
											className="rounded-full h-10 w-24 bgOnButton mx-auto mt-3 text-sm"
											onClick={() => {
												setConNumber("");
												setContactDetail(false);
											}}
										>
											BACK
										</button>
									</div>
								</section>
							)
					)
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
