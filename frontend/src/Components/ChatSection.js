import React from "react";
import LeftMessage from "./LeftMessage";
import RightMessage from "./RightMessage";
export default function ChatSection() {
	return (
		<>
			<div className="flex rounded-lg bg-blue-100 justify-end px-5 pb-2">
				<RightMessage />
			</div>
			<div className="flex rounded-lg bg-blue-100 justify-start px-5 pb-2">
				<LeftMessage />
			</div>
			<div className="flex rounded-lg bg-blue-100 justify-end px-5 pb-2">
				<RightMessage />
			</div>
			<div className="flex rounded-lg bg-blue-100 justify-start px-5 pb-2">
				<LeftMessage />
			</div>
			<div className="flex rounded-lg bg-blue-100 justify-end px-5 pb-2">
				<RightMessage />
			</div>
			
		</>
	);
}
