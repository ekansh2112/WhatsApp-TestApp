import React, { useEffect } from "react";
import Base from "../Base";
import ActiveChat from "../Components/ActiveChat";
import ChatSection from "../Components/ChatSection";
import InputMessage from "../Components/InputMessage";
import RecentChat from "../Components/RecentChat";
export default function Home() {
	const disp = () => {
		let arr = [];
		let contactNumber = 18;
		let random = Math.floor(Math.random() * 17);
		for (let i = 0; i < 18; i++) {
			if (i === contactNumber - 1) {
				arr.push(<RecentChat key={i} last={true} />);
			} else if (i === random) {
				arr.push(<RecentChat key={i} active={true} />);
			} else {
				arr.push(<RecentChat key={i} />);
			}
		}
		return arr;
	};
	return (
		<>
			<Base>
				<div className="flex items-center">
					<div className="mx-10 ml-14 p-7 bg-white removeScrollbar overflow-y-scroll rounded-3xl" style={{ height: "616px", width: "315px" }}>
						{disp()}
					</div>
					<div className="my-6 rounded-3xl bgOnChatPanel" style={{ height: "616px", width: "1040px" }}>
						<ActiveChat />
						<div className="pt-3 overflow-y-scroll removeScrollbar" style={{ height: "440px" }}>
							<ChatSection />
						</div>
						<InputMessage />
					</div>
				</div>
			</Base>
		</>
	);
}
