import React, { useEffect, useState } from "react";
export default function RecentChat({ chats, toggle, setToggle }) {
	console.log(chats, "idgaf22");
	console.log(localStorage.getItem("latestNumber"), "idgaf11122");
	const [recentChats, setRecentChats] = useState();
	useEffect(() => {
		setRecentChats(chats.find((data) => data?.contact === localStorage.getItem("latestNumber")));
	}, [toggle]);
	return (
		<>
			{chats.length > 0 ? (
				<div className="mx-10 ml-14 p-7 bg-white removeScrollbar overflow-y-scroll rounded-3xl" style={{ height: "616px", width: "315px" }}>
					{chats.map((chat, index) => {
						let latestMessage = chat.data.length - 1;
						return (
							<div
								key={index}
								className={
									index === chat.length - 1
										? "flex cursor-pointer rounded-full items-center"
										: chat.contact === localStorage.getItem("latestNumber")
										? "flex cursor-pointer mb-4 bgOnRecentChat rounded-full items-center"
										: "flex cursor-pointer mb-4 rounded-full items-center"
								}
								onClick={() => {
									localStorage.setItem("latestNumber", chat.contact);
									setToggle(!toggle);
								}}
							>
								<img className="w-14 h-14 rounded-full mr-3" src={chat.data[0].profile.image} alt="Image_1" />
								<div className="text-sm">
									<p className="text-xs mb-2">{chat.data[0].profile.fname + " " + chat.data[0].profile.lname} </p>
									<p className="text-xs mt-2">{chat.data[latestMessage].detail.message.text.body} </p>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<div className="mx-10 ml-14 p-7 bg-white removeScrollbar overflow-y-scroll rounded-3xl" style={{ height: "616px", width: "315px" }}>
					No chats to display!
				</div>
			)}
		</>
	);
}
