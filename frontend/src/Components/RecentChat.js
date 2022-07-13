import React from "react";
import { SpeakerphoneIcon } from "@heroicons/react/solid";
export default function RecentChat({ chats, toggle, setToggle }) {
	var regExp = /[a-zA-Z]/g;
	return (
		<>
			{chats.length > 0 ? (
				<div className="mx-10 ml-14 p-7 bg-white removeScrollbar overflow-y-scroll rounded-3xl" style={{ height: "616px", width: "315px" }}>
					{chats.map((chat, index) => {
						let latestMessage = chat.data.length - 1;
						if (regExp.test(chat.name)) {
							return (
								<div
									key={index}
									className={
										index === chat.length - 1
											? "flex cursor-pointer rounded-full items-center"
											: chat.name === localStorage.getItem("latestChatOnTop")
											? "flex cursor-pointer mb-4 bgOnRecentChat rounded-full items-center"
											: "flex cursor-pointer mb-4 rounded-full items-center"
									}
									onClick={() => {
										localStorage.setItem("latestChatOnTop", chat.name);
										setToggle(!toggle);
									}}
								>
									<figure className="w-14 h-14 bgOnSpeakerPhone mr-3 flex justify-center items-center rounded-full">
										<SpeakerphoneIcon className="h-7 w-7 fontColorOnSpeakerPhone inline" />
									</figure>
									<div className="text-sm">
										<p className="text-xs mb-2">{chat.name.slice(2)}</p>
										<p className="text-xs mt-2">{chat.data[latestMessage].detail.message.substring(0, 28)}</p>
									</div>
								</div>
							);
						} else {
							return (
								<div
									key={index}
									className={
										index === chat.length - 1
											? "flex cursor-pointer rounded-full items-center"
											: chat.name === localStorage.getItem("latestChatOnTop")
											? "flex cursor-pointer mb-4 bgOnRecentChat rounded-full items-center"
											: "flex cursor-pointer mb-4 rounded-full items-center"
									}
									onClick={() => {
										localStorage.setItem("latestChatOnTop", chat.name);
										setToggle(!toggle);
									}}
								>
									<img className="w-14 h-14 rounded-full mr-3" src={chat.data[0].profile.image} alt="Image_1" />
									<div className="text-sm">
										<p className="text-xs mb-2">{chat.data[0].profile.fname + " " + chat.data[0].profile.lname}</p>
										<p className="text-xs mt-2">
											{chat.data[latestMessage].detail.messageType === "image" || chat.data[latestMessage].detail.messageType === "document"
												? "Media"
												: chat.data[latestMessage].detail.message.text.body.substring(0, 28)}
										</p>
									</div>
								</div>
							);
						}
					})}
				</div>
			) : (
				<div className="mx-10 ml-14 p-7 bg-white font-bold text-2xl flex justify-center items-center removeScrollbar overflow-y-scroll rounded-3xl" style={{ height: "616px", width: "315px" }}>
					No chats to display!
				</div>
			)}
		</>
	);
}
