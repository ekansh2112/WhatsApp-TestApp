import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Contact from "../Components/Contact";
import Base from "../Base";
import { toast } from "react-toastify";
import { newMessage } from "../data/Messages";
export default function NewMessage({ ListOfContacts }) {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		message: "",
		mobileNumber: "",
	});
	const { message, mobileNumber } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const sendMessage = (e) => {
		e.preventDefault();
		if (message !== "") {
			newMessage({
				messagePayload: {
					text: { preview_url: "false", body: message },
				},
				contactNumber: mobileNumber,
				messageType: "text",
			})
				.then((data) => {
					if (data?.stat === "success") {
						setValues({
							message: "",
							mobileNumber: "",
						});
						navigate("/");
					} else if (data?.stat === "error") {
						return toast.error(data?.message);
					}
				})
				.catch((e) => {
					toast.error("Not able to send message! Please try again!");
					console.log(e);
				});
		} else {
			toast.error("Please enter text for messsge!");
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
									className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-light py-3"
									type="text"
									placeholder="Type your message here"
									value={message}
									onChange={handleChange("message")}
								/>
								<input className="rounded-lg self-center inputShadow h-9 w-full mt-1 mb-5 px-3 text-xs font-light py-3" type="search" id="search" placeholder="Search for a contact" />
								<div className="flex flex-col justify-start h-full overflow-y-scroll removeScrollbar w-full" value={mobileNumber} onChange={handleChange("mobileNumber")}>
									{ListOfContacts?.map((contact, index) => {
										return <Contact key={index} contact={contact} needMB={index === ListOfContacts?.length - 1 ? true : false} needRadio={true} />;
									})}
								</div>
								<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4" onClick={sendMessage}>
									SEND MESSAGE
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
