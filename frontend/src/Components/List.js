import React from "react";
import { SpeakerphoneIcon } from "@heroicons/react/solid";
export default function List({ needMB, needCheckBox }) {
	return (
		<>
			<div className={needMB && needCheckBox ? "flex mb-3 justify-center" : needMB ? "flex mb-3" : "flex"}>
				<figure className="w-14 h-14 bg-slate-300 flex justify-center items-center rounded-full mr-3">
					<SpeakerphoneIcon className="h-7 w-7 text-stone-100 inline" />
				</figure>
				<div className="text-sm flex flex-col justify-center">
					<p className="text-gray-900 text-xs mb-2">New Customers</p>
					<p className="text-gray-600 text-xs">30 contacts</p>
				</div>
				{needCheckBox && (
					<div className="flex ml-24 justify-center items-center">
						<input className="rounded-lg h-5 w-5" type="checkbox" id="selectcontact" />
					</div>
				)}
			</div>
		</>
	);
}
