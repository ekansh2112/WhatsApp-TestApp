import React from "react";
import Base from "../Base";
import ChatSection from "../Components/ChatSection";
import RecentChat from "../Components/RecentChat";
export default function Home() {
	return (
		<>
			<Base>
				<div className="flex items-center">
					<RecentChat />
					<ChatSection />
				</div>
			</Base>
		</>
	);
}
