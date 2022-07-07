import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { newContact } from "../data/Contacts";
import Base from "../Base";
import { getRandomColor, createImageFromInitials } from "../utilities/ImageGenerator";
export default function NewContact({ setCrudContactList, crudContactList }) {
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		mobileNumber: "",
		emailAddress: "",
		address: "",
		birthDate: "",
	});
	const navigate = useNavigate();
	const { firstName, lastName, mobileNumber, emailAddress, address, birthDate } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const createContact = (e) => {
		let imageString = createImageFromInitials(100, firstName + " " + lastName, getRandomColor(), "#FFFFFF");
		e.preventDefault();
		if (mobileNumber !== "") {
			newContact({
				image: imageString,
				fname: firstName,
				lname: lastName,
				phoneNumber: mobileNumber,
				email: emailAddress,
				address: address,
				dob: birthDate,
			})
				.then((data) => {
					if (data?.stat === "success") {
						setValues({
							firstName: "",
							lastName: "",
							mobileNumber: "",
							emailAddress: "",
							address: "",
							birthDate: "",
						});
						toast.success(data?.message);
						setCrudContactList(!crudContactList);
						navigate("/contacts");
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
			<Base>
				<section className="flex justify-center items-center mt-20">
					<div className="rounded-lg py-7 px-10 flex flex-col justify-center panelShadow bg-white" style={{ height: "550px", width: "500px" }}>
						<div className="flex flex-row justify-between">
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2" htmlFor="firstname">
									First Name
								</label>
								<input
									className="rounded-lg inputShadow h-9 w-44 mb-4 px-3 text-xs font-light py-3"
									type="text"
									name="firstname"
									placeholder="First Name"
									value={firstName}
									onChange={handleChange("firstName")}
								/>
							</div>
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2" htmlFor="lastname">
									Last Name
								</label>
								<input
									className="rounded-lg inputShadow h-9 w-44 mb-4 px-3 text-xs font-light py-3"
									type="text"
									name="lastname"
									placeholder="Last Name"
									value={lastName}
									onChange={handleChange("lastName")}
								/>
							</div>
						</div>
						<label className="text-sm font-normal mb-2" htmlFor="mobilenumber">
							Mobile Number
						</label>
						<input
							className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3"
							type="text"
							pattern="[56789][0-9]{9}"
							maxLength="10"
							name="mobilenumber"
							placeholder="Mobile Number"
							value={mobileNumber}
							onChange={handleChange("mobileNumber")}
						/>
						<label className="text-sm font-normal mb-2" htmlFor="email">
							Email Address
						</label>
						<input
							className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3"
							type="text"
							name="email"
							placeholder="Email"
							value={emailAddress}
							onChange={handleChange("emailAddress")}
						/>
						<label className="text-sm font-normal mb-2" htmlFor="address">
							Address
						</label>
						<input
							className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3"
							type="text"
							name="address"
							placeholder="Address"
							value={address}
							onChange={handleChange("address")}
						/>
						<label className="text-sm font-normal mb-2" htmlFor="birthday">
							Birthday
						</label>
						<input className="rounded-lg inputShadow h-9 w-full mb-7 px-3 text-xs font-light py-3" type="date" name="birthday" value={birthDate} onChange={handleChange("birthDate")} />
						<button
							className="rounded-full h-9 w-60 bgOnButton mx-auto mt-3 text-xs font-medium"
							type={"submit"}
							onClick={(e) => {
								createContact(e);
							}}
						>
							SAVE CONTACT
						</button>
					</div>
				</section>
			</Base>
		</>
	);
}
