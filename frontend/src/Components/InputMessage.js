import React, { useState, useRef } from "react";
import { PaperClipIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { newMessage, newFileMessage } from "../data/Messages";
import { searchContact } from "../data/Contacts";
export default function InputMessage({ latestChat, toggle, setToggle }) {
	const sendButton = useRef(null);
	const [values, setValues] = useState({
		message: "",
		mobileNumber: latestChat?.contact,
	});
	const { message, mobileNumber } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const sendMessage = (e) => {
		let messageType = "text";
		e.preventDefault();
		if (message !== "") {
			newMessage({
				messagePayload: {
					text: { preview_url: "false", body: message },
				},
				contactNumber: mobileNumber,
				messageType: messageType,
			})
				.then((res) => {
					if (res?.stat === "success") {
						setValues({
							...values,
							message: "",
						});
						let myresult = JSON.parse(localStorage.getItem(res?.message?.receiver)) || [];
						let data2;
						searchContact({ phoneNumber: res?.message?.receiver.slice(2) })
							.then((data) => {
								data2 = {
									type: "send",
									profile: {
										phoneNumber: data[0].phoneNumber,
										fname: data[0].fname,
										lname: data[0].lname,
										image: data[0].image,
									},
									detail: {
										message: res?.message?.message,
										messageType: "text",
									},
									time: Date.now(),
								};
								myresult.push(data2);
								localStorage.setItem(data[0].phoneNumber, JSON.stringify(myresult));
								setToggle(!toggle);
							})
							.catch((e) => {
								console.log(e);
							});
						localStorage.setItem("latestNumber", mobileNumber);
					} else if (res?.stat === "error") {
						return toast.error(res?.message);
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

	const getBase64 = (file) => {
		return new Promise((resolve) => {
			let baseURL = "";
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				baseURL = reader.result;
				resolve(baseURL);
			};
		});
	};
	const fileInput = useRef(null);
	const [file, setFile] = useState("");
	const sendFileMessage = (e) => {
		let messageType;
		if (file.type.includes("pdf")) {
			messageType = "document";
		} else if (file.type.includes("jpg") || file.type.includes("png") || file.type.includes("jpeg")) {
			messageType = "image";
		}
		e.preventDefault();
		const uploadData = new FormData();
		uploadData.append("messageType", messageType);
		uploadData.append("contactNumber", mobileNumber);
		uploadData.append("file", file);
		newFileMessage(uploadData)
			.then((res) => {
				if (res?.stat === "success") {
					let imageBase64 = "";
					if (messageType === "image") {
						getBase64(file)
							.then((result) => {
								file["base64"] = result;
								imageBase64 = file.base64;
							})
							.catch((err) => {
								console.log(err);
							});
					}
					let myresult = JSON.parse(localStorage.getItem(res?.message?.receiver)) || [];
					let data2;
					searchContact({ phoneNumber: res?.message?.receiver.slice(2) })
						.then((data) => {
							data2 = {
								type: "send",
								profile: {
									phoneNumber: data[0].phoneNumber,
									fname: data[0].fname,
									lname: data[0].lname,
									image: data[0].image,
								},
								detail: {
									message: messageType === "image" ? imageBase64 : res?.message?.message?.document?.filename,
									messageType: messageType,
								},
								time: Date.now(),
							};
							myresult.push(data2);
							localStorage.setItem(data[0].phoneNumber, JSON.stringify(myresult));
							setToggle(!toggle);
						})
						.catch((e) => {
							console.log(e);
						});
					localStorage.setItem("latestNumber", mobileNumber);
					setFile("");
					toast.success("File sent!");
				} else if (res?.stat === "error") {
					return toast.error(res?.message);
				}
			})
			.catch((e) => {
				toast.error("Not able to send message! Please try again!");
				console.log(e);
			});
	};
	return (
		<>
			<div className="flex justify-between items-center p-5">
				<button
					className="rounded-full h-12 w-12 flex items-center justify-center bgOnButton"
					type="button"
					onClick={() => {
						fileInput.current.click();
					}}
				>
					<PaperClipIcon className="h-6 w-6" />
				</button>
				<input
					className="hidden"
					onChange={(e) => {
						setFile(e.target.files[0]);
					}}
					type="file"
					name=""
					ref={fileInput}
				/>
				<textarea
					className="px-4 h-12 text-sm w-5/6 rounded-full removeScrollbar"
					style={{ paddingTop: "14px", resize: "none" }}
					type="text"
					name="message"
					placeholder="Type your message here"
					value={message}
					onChange={handleChange("message")}
					onKeyDown={(e) => {
						const keyCode = e.code;
						const wasShiftPressed = e.shiftKey;
						if (!wasShiftPressed) {
							if (keyCode === "Enter") {
								e.preventDefault();
								sendButton.current.click();
							}
						}
					}}
				/>
				<button className="rounded-full h-12 w-12 flex items-center justify-center bgOnButton rotate-90" type="submit" onClick={file ? sendFileMessage : sendMessage} ref={sendButton}>
					<PaperAirplaneIcon className="h-6 w-6" />
				</button>
			</div>
		</>
	);
}
