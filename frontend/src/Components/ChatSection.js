import React, { useEffect, useState } from "react";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
import ActiveChat from "./ActiveChat";
export default function ChatSection({ chats, toggle, setToggle, latestChat }) {
	return (
		<>
			{latestChat && latestChat.data.length > 0 ? (
				<>
					<div className="my-6 rounded-3xl bgOnChatPanel" style={{ height: "616px", width: "1040px" }}>
						<ActiveChat latestChat={latestChat} toggle={toggle} setToggle={setToggle} />
						<Messages latestChat={latestChat} toggle={toggle} setToggle={setToggle} />
						<InputMessage latestChat={latestChat} toggle={toggle} setToggle={setToggle} />
					</div>
				</>
			) : (
				<div className="my-6 flex justify-center items-center rounded-3xl bgOnChatPanel" style={{ height: "616px", width: "1040px" }}>
					No chats to display!
				</div>
			)}
		</>
	);
}
