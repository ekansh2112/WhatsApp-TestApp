import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import { newBroadcastList } from "../data/BroadcastLists";
import { searchContact } from "../data/Contacts";
import Contact from "../Components/Contact";
import Base from "../Base";
export default function NewBroadcastList({ ListOfContacts, crudBroadcastList, setCrudBroadcastList }) {
	const [res, setres] = useState(false);
	const [result, setresult] = useState({
		phoneNumber: "",
		fname: "",
		lname: "",
		image: ""
	});
	const handleChange1 = (name) => (event) => {
		setsearch(event.target.value);
	};
	const setsearch = (value) => {
		if (value.length === 10) {
			searchContact({ phoneNumber: value })
				.then((data) => {
					console.log(data);
					setresult({
						phoneNumber: data[0].phoneNumber,
						fname: data[0].fname,
						lname: data[0].lname,
						image: data[0].image
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
	const [allCheckedBoxes, setAllCheckedBoxes] = useState({});
	const [values, setValues] = useState({
		nameOfTheList: "",
		contacts: []
	});
	const navigate = useNavigate();
	const { nameOfTheList, contacts } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const createBroadcastList = (e) => {
		let myArray = Array.from(allCheckedBoxes);
		for (let index = 0; index < myArray.length; index++) {
			contacts[index] = myArray[index]?.value;
		}
		e.preventDefault();
		if (nameOfTheList !== "") {
			newBroadcastList({ title: nameOfTheList, recipients: contacts })
				.then((data) => {
					if (data?.stat === "success") {
						toast.success(data?.message);
						setCrudBroadcastList(!crudBroadcastList);
						navigate("/broadcastlists");
					} else if (data?.stat === "error") {
						return toast.error(data?.message);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			return toast.warning("Please add the name of the list!");
		}
	};
	return (
		<>
			<Base>
				{ListOfContacts?.length > 0 ? (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-col">
									<input
										className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3"
										type="text"
										name="nameOfTheList"
										placeholder="Name of the broadcast list"
										value={nameOfTheList}
										onChange={handleChange("nameOfTheList")}
									/>
								</div>
								{/* <input
									className="rounded-lg self-center inputShadow h-9 w-full mt-1 mb-5 px-3 text-xs font-light py-3"
									type="search"
									id="search"
									onChange={handleChange1("search")}
									placeholder="Search for a contact"
								/> */}
								<div className="flex flex-col justify-start h-full overflow-y-scroll removeScrollbar w-full">
									{res == true ? (
										<Contact contact={result} needCheckBox={true} setAllCheckedBoxes={setAllCheckedBoxes} />
									) : (
										ListOfContacts?.map((contact, index) => {
											return (
												<Contact
													key={index}
													contact={contact}
													needMB={index === ListOfContacts?.length - 1 ? true : false}
													needCheckBox={true}
													setAllCheckedBoxes={setAllCheckedBoxes}
												/>
											);
										})
									)}
								</div>

								<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4" onClick={createBroadcastList}>
									SAVE BROADCAST LIST
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
