import React, { useState, useRef } from "react";
import { PaperClipIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { newMessage, newFileMessage } from "../data/Messages";
export default function InputMessage({ contact }) {
	const sendButton = useRef(null);
	const [values, setValues] = useState({
		message: "",
	});
	const { message } = values;
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
				contactNumber: 918860799603,
				messageType: messageType,
			})
				.then((data) => {
					if (data?.stat === "success") {
						setValues({
							message: "",
						});
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
		uploadData.append("contactNumber", 918860799603);
		uploadData.append("file", file);
		newFileMessage(uploadData)
			.then((data) => {
				if (data?.stat === "success") {
					setFile("");
					toast.success("File sent!");
				} else if (data?.stat === "error") {
					return toast.error(data?.message);
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
