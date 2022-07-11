import React from "react";
export default function ActiveChat({ latestChat }) {
	return (
		<>
			<div className="flex rounded-3xl bgOnActiveChat items-center pl-6 py-3">
				<img className="w-14 h-14 rounded-full mr-3" src={latestChat?.data[0]?.profile?.image} alt="image_1" />
				<div className="text-sm">
					<p className="text-xs mb-2">{latestChat?.data[0]?.profile?.fname + " " + latestChat?.data[0]?.profile?.lname}</p>
					<p className="text-xs mt-2">{latestChat?.contact.slice(2)}</p>
				</div>
			</div>
		</>
	);
}
