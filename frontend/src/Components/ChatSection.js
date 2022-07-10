import React from "react";
import InputMessage from "./InputMessage";
import Message from "./Message";
import ActiveChat from "./ActiveChat";
export default function ChatSection({ toggle, setToggle }) {
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
	return (
		<>
			<div className="my-6 rounded-3xl bgOnChatPanel" style={{ height: "616px", width: "1040px" }}>
				<ActiveChat />
				<div className="pt-3 overflow-y-scroll removeScrollbar" style={{ height: "440px" }}>
					{disp()}
				</div>
				<InputMessage toggle={toggle} setToggle={setToggle} />
			</div>
		</>
	);
}
