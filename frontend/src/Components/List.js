import React, { useState } from "react";
import { SpeakerphoneIcon } from "@heroicons/react/solid";
import Contact from "./Contact";
export default function List({ needMB, needRadio, broadcastlist }) {
	console.log(broadcastlist, "idgaf555");
	const [seeListDetail, setSeeListDetail] = useState(false);
	return (
		<>
			{!seeListDetail ? (
				<div
					className={
						needRadio
							? needMB
								? "flex cursor-pointer justify-around"
								: "flex cursor-pointer mb-3 justify-around"
							: needMB
							? "flex cursor-pointer justify-center"
							: "flex cursor-pointer mb-3 justify-center"
					}
					onClick={() => setSeeListDetail(true)}
				>
					<figure
						className={
							needRadio ? "w-14 h-14 bgOnSpeakerPhone flex justify-center items-center rounded-full" : "w-14 h-14 mr-8 bgOnSpeakerPhone flex justify-center items-center rounded-full"
						}
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
			) : (
				<>
					<div>
						<div className="flex cursor-pointer justify-center">
							<Contact />
						</div>
						<button className="rounded-full h-8 w-24 bgOnButton mx-auto mt-3 text-sm mb-4" onClick={() => setSeeListDetail(false)}>
							BACK
						</button>
					</div>
				</>
			)}
		</>
	);
}
