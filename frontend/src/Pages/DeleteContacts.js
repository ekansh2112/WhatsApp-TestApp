import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Contact from "../Components/Contact";
import { toast } from "react-toastify";
import { searchContact, deleteContact } from "../data/Contacts";
import Base from "../Base";
export default function DeleteContacts({ setCrudContactList, crudContactList, ListOfContacts, toggle, setToggle }) {
	const [res, setres] = useState(false);
	const [result, setresult] = useState({
		phoneNumber: "",
		fname: "",
		lname: "",
		image: "",
	});
	const [values, setValues] = useState({
		mobileNumber: "",
	});
	const { mobileNumber } = values;
	const handleChange = (name) => (event) => {
		if (name === "search") setsearch(event.target.value);
		setValues({ ...values, error: false, [name]: event.target.value });
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
	const removeContact = (e) => {
		e.preventDefault();
		if (mobileNumber !== "") {
			deleteContact({ phoneNumber: mobileNumber.slice(2) })
				.then((data) => {
					if (data?.stat === "success") {
						localStorage.removeItem(mobileNumber);
						setValues({
							mobileNumber: "",
						});
						setToggle(!toggle);
						toast.success(data?.message);
						setCrudContactList(!crudContactList);
					} else if (data?.stat === "error") {
						return toast.error(data?.message);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			return toast.warning("Please select a contact!");
		}
	};
	return (
		<>
			<Base>
				{ListOfContacts?.length > 0 ? (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<input
									className="rounded-lg self-center inputShadow h-9 w-full mt-1 mb-5 px-3 text-xs font-light py-3"
									type="search"
									name="search"
									placeholder="Search for a contact"
									onChange={handleChange("search")}
								/>
								<div className="flex flex-col justify-start h-full overflow-y-scroll removeScrollbar w-full" value={mobileNumber} onChange={handleChange("mobileNumber")}>
									{res === true ? (
										<Contact contact={result} needRadio={true} />
									) : (
										ListOfContacts?.map((contact, index) => {
											return <Contact key={index} contact={contact} needMB={index === ListOfContacts?.length - 1 ? true : false} needRadio={true} />;
										})
									)}
								</div>
								<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4" onClick={removeContact}>
									DELETE
								</button>
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
