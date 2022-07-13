import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Base from "../Base";
import { toast } from "react-toastify";
import List from "../Components/List";
import { newBroadcastMessage } from "../data/Messages";
export default function NewMessageBroadcast({ ListOfBroadcastLists, toggle, setToggle }) {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		message: "",
		nameOfTheList: "",
	});
	const { message, nameOfTheList } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const sendMessageBroadcast = (e) => {
		e.preventDefault();
		if (message !== "" && nameOfTheList !== "") {
			newBroadcastMessage({ title: nameOfTheList, message: message })
				.then((res) => {
					if (res?.stat === "success") {
						let myresult = [];
						let data2;
						data2 = {
							type: "sent",
							profile: {
								phoneNumbers: res.broadcastList.recipients,
								fname: res.broadcastList.title,
								image: "broadcastlist",
							},
							detail: {
								message: message,
								messageType: "text",
							},
							time: Date.now(),
						};
						myresult.push(data2);
						localStorage.setItem(`91${res.broadcastList.title}`, JSON.stringify(myresult));
						localStorage.setItem("latestChatOnTop", `91${res.broadcastList.title}`);
						setToggle(!toggle);
						setValues({
							...values,
							message: "",
						});
						navigate("/");
					} else if (res?.stat === "error") {
						return toast.error(res?.message);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			return toast.warning("Please select a list or add a message!");
		}
	};
	return (
		<>
			<Base>
				{ListOfBroadcastLists?.length > 0 ? (
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
								<div className="flex flex-col justify-start h-full overflow-y-scroll removeScrollbar w-full" value={nameOfTheList} onChange={handleChange("nameOfTheList")}>
									{ListOfBroadcastLists?.map((broadcastlist, index) => {
										return <List key={index} broadcastlist={broadcastlist} needMB={index === ListOfBroadcastLists?.length - 1 ? true : false} needRadio={true} />;
									})}
								</div>
								<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4" onClick={sendMessageBroadcast}>
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
									<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newbroadcastlist">
										<PlusIcon className="h-6 w-6 inline" />
									</Link>
								</div>
								<h1 className="text-center font-semibold text-lg capitalize">Add your first broadcast list now!</h1>
							</div>
						</section>
					</>
				)}
			</Base>
		</>
	);
}
