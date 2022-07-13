import React, { useRef, useEffect } from "react";
import Base from "../Base";
import ChatSection from "../Components/ChatSection";
import RecentChat from "../Components/RecentChat";
export default function Home({ chats, toggle, setToggle, latestChat }) {
	const refreshButton = useRef(null);
	useEffect(() => {
		let timer1 = setInterval(() => {
			refreshButton.current.click();
		}, 5000);
		return () => {
			clearInterval(timer1);
		};
	}, []);
	return (
		<>
			<Base>
				<div className="invisible" onClick={() => setToggle(!toggle)} ref={refreshButton}></div>
				<div className="flex items-center">
					<RecentChat latestChat={latestChat} chats={chats} toggle={toggle} setToggle={setToggle} />
					<ChatSection latestChat={latestChat} chats={chats} toggle={toggle} setToggle={setToggle} />
				</div>
			</Base>
		</>
	);
}
