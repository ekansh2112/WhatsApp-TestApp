import React from "react";
export default function Messages({ latestChat }) {
	var regExp = /[a-zA-Z]/g;
	return (
		<div className="pt-3 overflow-y-scroll removeScrollbar" style={{ height: "440px" }}>
			{latestChat.data.map((messages, index) => {
				if (regExp.test(latestChat.name)) {
					return (
						<div key={index} className={messages.type === "send" ? "flex justify-end px-5 pb-2" : "flex justify-start px-5 pb-2"}>
							{messages.detail.messageType === "image" ? (
								<img className="rounded-xl bgOnMessage mt-1 max-w-md text-sm py-5 px-5" src={messages.detail.message} alt="image" />
							) : messages.detail.messageType === "document" ? (
								<div className="rounded-xl flex justify-center items-center bgOnMessage mt-1 max-w-md text-sm py-5 px-5">
									<svg height={"50px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.60801 309.267">
										<path
											d="M38.658,0h164.23l87.049,86.711V289.938a19.3298,19.3298,0,0,1-19.329,19.329H38.658a19.32979,19.32979,0,0,1-19.329-19.329V19.329A19.33042,19.33042,0,0,1,38.658,0Z"
											transform="translate(-19.329)"
											fill="#e2574c"
										/>
										<path d="M289.658,86.981H222.286a19.33553,19.33553,0,0,1-19.329-19.329V.193Z" transform="translate(-19.329)" fill="#b53629" />
										<path
											d="M217.434,146.544c3.238,0,4.823-2.822,4.823-5.557,0-2.832-1.653-5.567-4.823-5.567h-18.44c-3.605,0-5.615,2.986-5.615,6.282v45.317c0,4.04,2.3,6.282,5.412,6.282,3.093,0,5.403-2.242,5.403-6.282V174.581h11.153c3.46,0,5.19-2.832,5.19-5.644,0-2.754-1.73-5.49-5.19-5.49H204.194V146.544ZM155.107,135.42H141.615a5.96643,5.96643,0,0,0-6.263,6.243v45.395c0,4.629,3.74,6.079,6.417,6.079h14.159c16.758,0,27.824-11.027,27.824-28.047C183.743,147.095,173.325,135.42,155.107,135.42Zm.648,46.526H147.53V146.612h7.413c11.221,0,16.101,7.529,16.101,17.918C171.044,174.253,166.25,181.946,155.755,181.946ZM106.33,135.42H92.964c-3.779,0-5.886,2.493-5.886,6.282v45.317c0,4.04,2.416,6.282,5.663,6.282s5.663-2.242,5.663-6.282V173.788h8.379c10.341,0,18.875-7.326,18.875-19.107C125.659,143.152,117.425,135.42,106.33,135.42Zm-.222,27.738H98.405V146.061h7.703c4.755,0,7.78,3.711,7.78,8.553C113.878,159.447,110.863,163.158,106.108,163.158Z"
											transform="translate(-19.329)"
											fill="#fff"
										/>
									</svg>
									<span className="pl-4 font-semibold text-lg">{messages.detail.message}</span>
								</div>
							) : (
								<div className="rounded-xl bgOnMessage mt-1 max-w-md text-sm py-2 px-5">{messages.detail.message}</div>
							)}
						</div>
					);
				} else {
					return (
						<div key={index} className={messages.type === "send" ? "flex justify-end px-5 pb-2" : "flex justify-start px-5 pb-2"}>
							{messages.detail.messageType === "image" ? (
								<img className="rounded-xl bgOnMessage mt-1 max-w-md text-sm py-5 px-5" src={messages.detail.message} alt="image" />
							) : messages.detail.messageType === "document" ? (
								<div className="rounded-xl flex justify-center items-center bgOnMessage mt-1 max-w-md text-sm py-5 px-5">
									<svg height={"50px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.60801 309.267">
										<path
											d="M38.658,0h164.23l87.049,86.711V289.938a19.3298,19.3298,0,0,1-19.329,19.329H38.658a19.32979,19.32979,0,0,1-19.329-19.329V19.329A19.33042,19.33042,0,0,1,38.658,0Z"
											transform="translate(-19.329)"
											fill="#e2574c"
										/>
										<path d="M289.658,86.981H222.286a19.33553,19.33553,0,0,1-19.329-19.329V.193Z" transform="translate(-19.329)" fill="#b53629" />
										<path
											d="M217.434,146.544c3.238,0,4.823-2.822,4.823-5.557,0-2.832-1.653-5.567-4.823-5.567h-18.44c-3.605,0-5.615,2.986-5.615,6.282v45.317c0,4.04,2.3,6.282,5.412,6.282,3.093,0,5.403-2.242,5.403-6.282V174.581h11.153c3.46,0,5.19-2.832,5.19-5.644,0-2.754-1.73-5.49-5.19-5.49H204.194V146.544ZM155.107,135.42H141.615a5.96643,5.96643,0,0,0-6.263,6.243v45.395c0,4.629,3.74,6.079,6.417,6.079h14.159c16.758,0,27.824-11.027,27.824-28.047C183.743,147.095,173.325,135.42,155.107,135.42Zm.648,46.526H147.53V146.612h7.413c11.221,0,16.101,7.529,16.101,17.918C171.044,174.253,166.25,181.946,155.755,181.946ZM106.33,135.42H92.964c-3.779,0-5.886,2.493-5.886,6.282v45.317c0,4.04,2.416,6.282,5.663,6.282s5.663-2.242,5.663-6.282V173.788h8.379c10.341,0,18.875-7.326,18.875-19.107C125.659,143.152,117.425,135.42,106.33,135.42Zm-.222,27.738H98.405V146.061h7.703c4.755,0,7.78,3.711,7.78,8.553C113.878,159.447,110.863,163.158,106.108,163.158Z"
											transform="translate(-19.329)"
											fill="#fff"
										/>
									</svg>
									<span className="pl-4 font-semibold text-lg">{messages.detail.message}</span>
								</div>
							) : (
								<div className="rounded-xl bgOnMessage mt-1 max-w-md text-sm py-2 px-5">{messages.detail.message.text.body}</div>
							)}
						</div>
					);
				}
			})}
		</div>
	);
}
