import React from "react";
import { SpeakerphoneIcon } from "@heroicons/react/solid";
export default function ActiveChat({ latestChat }) {
	var regExp = /[a-zA-Z]/g;
	return (
		<>
			{regExp.test(latestChat.name) ? (
				<div className="flex rounded-3xl bgOnActiveChat items-center pl-6 py-3">
					<figure className="w-14 h-14 bgOnSpeakerPhone mr-3 flex justify-center items-center rounded-full">
						<SpeakerphoneIcon className="h-7 w-7 fontColorOnSpeakerPhone inline" />
					</figure>
					<div className="text-sm">
						<p className="text-xs mb-2">{latestChat?.data[0]?.profile?.fname}</p>
						<p className="text-xs mt-2">{latestChat?.data[0]?.profile?.phoneNumbers?.length + " Contacts"}</p>
					</div>
				</div>
			) : (
				<div className="flex rounded-3xl bgOnActiveChat items-center pl-6 py-3">
					<img className="w-14 h-14 rounded-full mr-3" src={latestChat?.data[0]?.profile?.image} alt="image_1" />
					<div className="text-sm">
						<p className="text-xs mb-2">{latestChat?.data[0]?.profile?.fname + " " + latestChat?.data[0]?.profile?.lname}</p>
						<p className="text-xs mt-2">{latestChat?.name.slice(2)}</p>
					</div>
				</div>
			)}
		</>
	);
}
