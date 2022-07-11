import React from "react";
export default function Message({ latestChat }) {
	return (
		<div className="pt-3 overflow-y-scroll removeScrollbar" style={{ height: "440px" }}>
			{latestChat.data.map((messages, index) => {
				return (
					<div key={index} className={messages.type === "send" ? "flex justify-end px-5 pb-2" : "flex justify-start px-5 pb-2"}>
						<div className="rounded-xl bgOnMessage mt-1 max-w-md text-sm py-2 px-5">{messages.detail.message.text.body}</div>
					</div>
				);
			})}
		</div>
	);
}
