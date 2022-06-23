import React from "react";
import Base from "../Base";
import ActiveChat from "../Components/ActiveChat";
import ChatSection from "../Components/ChatSection";
import InputMessage from "../Components/InputMessage";
import RecentChat from "../Components/RecentChat";
export default function Home() {
	const disp = () => {
		let arr = [];
		for (let i = 0; i < 8; i++) {
			if (i === 7) {
				arr.push(<RecentChat key={i} last={true} />);
			} else if (i === 2) {
				arr.push(<RecentChat key={i} second={true} />);
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
					<div className="bg-whit m-10 w-80 h-full shadow-2xl p-7 overflow-hidden sm:rounded-lg">{disp()}</div>
					<div className="bg-whit ml-6 mr-3 mt-10 mb-10 shadow-2xl overflow-hidden sm:rounded-lg bg-blue-100" style={{ height: "616px", width: "1040px" }}>
						<ActiveChat />
						<div className="pt-3" style={{ height: "440px" }}>
							<ChatSection />
						</div>
						<InputMessage />
					</div>
				</div>
			</Base>
		</>
	);
}
