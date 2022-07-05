import React from "react";
import { getRandomColor, createImageFromInitials } from "../utilities/ImageGenerator";
export default function RecentChat({ last, active }) {
	let name = "John Smith";
	return (
		<>
			<div className={last ? "flex rounded-full items-center" : active ? "flex mb-4 bgOnRecentChat rounded-full items-center" : "flex mb-4 rounded-full items-center"}>
				<img className="w-14 h-14 rounded-full mr-3" src={createImageFromInitials(100, name, getRandomColor(), "#FFFFFF")} alt="Image_1" />
				<div className="text-sm">
					<p className="text-xs mb-2">John Smith</p>
					<p className="text-xs mt-2">Lorem ipsum dolor sit uhd ijwd</p>
				</div>
			</div>
		</>
	);
}
