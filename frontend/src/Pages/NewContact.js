import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
import { newContact } from "../helpers/contacts/contacts.js";
export default function NewContact() {
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		mobileNumber: "",
		emailAddress: "",
		addressLine1: "",
		addressLine2: "",
		birthDate: "",
	});
	const navigate = useNavigate();
	const { firstName, lastName, mobileNumber, emailAddress, addressLine1, addressLine2, birthDate } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const createContact = (e) => {
		e.preventDefault();
		if (mobileNumber !== "") {
			newContact({ fname: firstName, lname: lastName, phoneNumber: mobileNumber, email: emailAddress, addressLine1: addressLine1, addressLine2: addressLine2, birthDate: birthDate })
				.then((data) => {
					console.log(data, "idgaf33773");
					if (data?.stat === "success") {
						setValues({
							firstName: "",
							lastName: "",
							mobileNumber: "",
							emailAddress: "",
							addressLine1: "",
							addressLine2: "",
							birthDate: "",
						});
						toast.success(data?.message);
						navigate("/");
					} else if (data?.stat === "error") {
						return toast.error(data?.message);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			return toast.warning("Please enter the mobile number!");
		}
	};
	return (
		<>
			<section className="flex justify-center items-center h-screen">
				<div className="rounded-lg p-7 flex flex-col justify-center myshadow" style={{ height: "550px", width: "450px" }}>
					<Link className="fixed crossbutton1" to="/">
						<XCircleIcon className="h-8 w-8" />
					</Link>
					<form className="flex flex-col justify-between" method="POST">
						<div className="flex flex-row justify-between">
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2" htmlFor="firstname">
									First Name
								</label>
								<input
									className="rounded-lg myshadow h-8 w-44 mb-4 px-3 focus:outline-none text-xs font-light py-3"
									type="text"
									name="firstname"
									placeholder="First Name"
									value={firstName}
									onChange={handleChange("firstName")}
									required
								></input>
							</div>
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2" htmlFor="lastname">
									Last Name
								</label>
								<input
									className="rounded-lg myshadow h-8 w-44 mb-4 px-3 focus:outline-none text-xs font-light py-3"
									type="text"
									name="lastname"
									placeholder="Last Name"
									value={lastName}
									onChange={handleChange("lastName")}
								></input>
							</div>
						</div>
						<label className="text-sm font-normal mb-2" htmlFor="mobilenumber">
							Mobile Number
						</label>
						<input
							className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3"
							type="text"
							pattern="[56789][0-9]{9}"
							maxLength="10"
							name="mobilenumber"
							placeholder="Mobile Number"
							value={mobileNumber}
							onChange={handleChange("mobileNumber")}
							required
						></input>
						<label className="text-sm font-normal mb-2" htmlFor="email">
							Email Address
						</label>
						<input
							className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3"
							type="text"
							name="email"
							placeholder="Email"
							value={emailAddress}
							onChange={handleChange("emailAddress")}
						></input>
						<label className="text-sm font-normal mb-2" htmlFor="addressline1">
							Address Line 1
						</label>
						<input
							className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3"
							type="text"
							name="addressline1"
							placeholder="Address Line 1"
							value={addressLine1}
							onChange={handleChange("addressLine1")}
						></input>
						<label className="text-sm font-normal mb-2" htmlFor="addressline2">
							Address Line 2
						</label>
						<input
							className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3"
							type="text"
							name="addressline2"
							placeholder="Address Line 2"
							value={addressLine2}
							onChange={handleChange("addressLine2")}
						></input>
						<label className="text-sm font-normal mb-2" htmlFor="birthday">
							Birthday
						</label>
						<input
							className="rounded-lg myshadow h-8 w-full mb-4 px-3 focus:outline-none text-xs font-light py-3"
							type="date"
							name="birthday"
							value={birthDate}
							onChange={handleChange("birthDate")}
						></input>
						<button
							className="rounded-full h-8 w-60 bg-yellow-400 mx-auto mt-3 text-xs font-medium"
							type={"submit"}
							onClick={(e) => {
								createContact(e);
							}}
						>
							SAVE CONTACT
						</button>
					</form>
				</div>
			</section>
		</>
	);
}
