import React, { useEffect, useState } from "react";
import Base from "../Base";
import ChatSection from "../Components/ChatSection";
import RecentChat from "../Components/RecentChat";
export default function Home({ chats, toggle, setToggle, latestChat }) {
	return (
		<>
			<Base>
				<div className="flex items-center">
					<RecentChat chats={chats} latestChat={latestChat} />
					<ChatSection latestChat={latestChat} chats={chats} toggle={toggle} setToggle={setToggle} />
				</div>
			</Base>
		</>
	);
}
