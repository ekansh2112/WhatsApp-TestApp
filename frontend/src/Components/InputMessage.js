import React, { useState, useRef } from "react";
import { PaperClipIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
export default function InputMessage() {
	const [message, setMessage] = useState("");
	const fileInput = useRef(null);
	function sendMessage() {
		alert(message);
	}
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
						console.log(e.target.value);
					}}
					type="file"
					name=""
					ref={fileInput}
				/>
				<input
					className="px-4 py-2 h-12 text-sm w-5/6 rounded-full"
					type="text"
					name="message"
					placeholder="Type your message here"
					onChange={(e) => {
						setMessage(e.target.value);
					}}
				/>
				<button className="rounded-full h-12 w-12 flex items-center justify-center bgOnButton rotate-90" type="submit" onClick={sendMessage}>
					<PaperAirplaneIcon className="h-6 w-6" />
				</button>
			</div>
		</>
	);
}
