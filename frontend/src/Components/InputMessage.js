import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
export default function InputMessage() {
	const [message, setMessage] = useState("");
	function sendMessage() {
		alert(message);
	}
	return (
		<>
			<div className="flex items-center p-5">
				<input
					type="text"
					name="first-name"
					id="first-name"
					autoComplete="given-name"
					placeholder="Type your message here"
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					className="pl-4 py-2 h-12 mr-5 focus:outline-none block w-full shadow-sm text-sm border-gray-300 rounded-lg"
				/>
				<button type="submit" onClick={sendMessage} className="inline-flex p-2 rotate-45 rounded-full justify-center h-12 w-12 bg-yellow-300 border border-transparent shadow-sm text-black">
					<PaperAirplaneIcon className="h-6 w-6" />
				</button>
			</div>
		</>
	);
}
