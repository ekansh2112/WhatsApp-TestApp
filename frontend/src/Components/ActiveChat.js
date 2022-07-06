import React from "react";
import { getRandomColor, createImageFromInitials } from "../utilities/ImageGenerator";
export default function ActiveChat() {
	let name = "John Smith";
	return (
		<>
			<div className="flex rounded-3xl bgOnActiveChat items-center pl-6 py-3">
				<img className="w-14 h-14 rounded-full mr-3" src={createImageFromInitials(100, name, getRandomColor(), "#FFFFFF")} alt="image_1" />
				<div className="text-sm">
					<p className="text-xs mb-2">John Smith</p>
					<p className="text-xs mt-2">9837528372</p>
				</div>
			</div>
		</>
	);
}
