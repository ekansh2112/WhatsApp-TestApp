import React, { useState, useRef } from "react";
import { PaperClipIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { newMessage } from "../data/Messages";
export default function InputMessage() {
	const [values, setValues] = useState({
		previewUrl: "",
		message: "",
		mobileNumber: "",
		messageType: "",
	});
	const { previewUrl, message, mobileNumber, messageType } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const fileInput = useRef(null);
	const sendMessage = (e) => {
		e.preventDefault();
		if (message !== "") {
			newMessage({
				messagePayload: {
					text: { preview_url: "false", body: message },
				},
				contactNumber: "918860799603",
				messageType: "text",
			})
				.then((data) => {
					if (data?.stat === "success") {
						setValues({
							previewUrl: "",
							message: "",
							mobileNumber: "",
							messageType: "",
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
						// console.log(e.target.value);
					}}
					type="file"
					name=""
					ref={fileInput}
				/>
				<input className="px-4 py-2 h-12 text-sm w-5/6 rounded-full" type="text" name="message" placeholder="Type your message here" value={message} onChange={handleChange("message")} />
				<button
					className="rounded-full h-12 w-12 flex items-center justify-center bgOnButton rotate-90"
					type="submit"
					onClick={(e) => {
						sendMessage(e);
					}}
				>
					<PaperAirplaneIcon className="h-6 w-6" />
				</button>
			</div>
		</>
	);
}
