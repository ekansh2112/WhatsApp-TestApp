import React from "react";
import Message from "./Message";
export default function ChatSection() {
	const disp = () => {
		let arr = [];
		for (let i = 0; i < 18; i++) {
			arr.push(
				<div key={i} className={i % 2 === 0 ? "flex justify-end px-5 pb-2" : "flex justify-start px-5 pb-2"}>
					<Message />
				</div>
			);
		}
		return arr;
	};
	return <>{disp()}</>;
}
