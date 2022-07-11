import React from "react";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
import ActiveChat from "./ActiveChat";
export default function ChatSection({ toggle, setToggle }) {
	// useEffect(() => {
	// 	var arr = [];
	// 	for (let i = 0; i < localStorage.length; i++) {
	// 		const key = localStorage.key(i);
	// 		// console.log(`${key}: ${localStorage.getItem(key)}`);
	// 		arr.push(localStorage.getItem(key));
	// 	}
	// 	setChats(arr);
	// }, [toggle]);
	return (
		<>
			<div className="my-6 rounded-3xl bgOnChatPanel" style={{ height: "616px", width: "1040px" }}>
				<ActiveChat toggle={toggle} setToggle={setToggle} />
				<Messages />
				<InputMessage toggle={toggle} setToggle={setToggle} />
			</div>
		</>
	);
}
