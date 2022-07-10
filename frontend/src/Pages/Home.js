import React, { useEffect, useState } from "react";
import Base from "../Base";
import ChatSection from "../Components/ChatSection";
import RecentChat from "../Components/RecentChat";
export default function Home({ chats, toggle, setToggle }) {
	return (
		<>
			<Base>
				<div className="flex items-center">
					<RecentChat chats={chats} />
					<ChatSection toggle={toggle} setToggle={setToggle} />
				</div>
			</Base>
		</>
	);
}
