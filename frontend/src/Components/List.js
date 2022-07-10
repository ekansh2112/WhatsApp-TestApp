import React from "react";
import { SpeakerphoneIcon } from "@heroicons/react/solid";
export default function List({ needMB, needRadio, broadcastlist }) {
	return (
		<>
			<div className={needRadio ? (needMB ? "flex justify-around" : "flex mb-3 justify-around") : needMB ? "flex justify-center" : "flex mb-3 justify-center"}>
				<figure
					className={needRadio ? "w-14 h-14 bgOnSpeakerPhone flex justify-center items-center rounded-full" : "w-14 h-14 mr-8 bgOnSpeakerPhone flex justify-center items-center rounded-full"}
				>
					<SpeakerphoneIcon className="h-7 w-7 fontColorOnSpeakerPhone inline" />
				</figure>
				<div className="w-40 text-sm flex flex-col justify-center">
					<p className="text-xs mb-2">{broadcastlist?.title}</p>
					<p className="text-xs">{broadcastlist?.recipients?.length} Contacts</p>
				</div>
				{needRadio && (
					<div className="flex justify-center items-center">
						<input className="rounded-lg h-5 w-5" type="radio" name="selectlist" value={broadcastlist?.title} />
					</div>
				)}
			</div>
		</>
	);
}
