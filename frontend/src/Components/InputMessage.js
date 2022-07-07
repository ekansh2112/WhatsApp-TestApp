import React, { useState, useRef, useEffect, useCallback } from "react";
import { PaperClipIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { newMessage } from "../data/Messages";
export default function InputMessage() {
	const sendButton = useRef(null);
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
				<button
					className="rounded-full h-12 w-12 flex items-center justify-center bgOnButton rotate-90"
					type="submit"
					onClick={(e) => {
						sendMessage(e);
					}}
					ref={sendButton}
				>
					<PaperAirplaneIcon className="h-6 w-6" />
				</button>
			</div>
		</>
	);
}
