import React from "react";
import { getRandomColor, createImageFromInitials } from "../utilities/ImageGenerator";
export default function Contact({ needMB, needCheckBox, needRadio, contact }) {
	let name = "John Smith";
	return (
		<>
			<div className={needMB && (needCheckBox || needRadio) ? "flex mb-3 justify-center" : needMB ? "flex mb-3" : "flex"}>
				{needRadio && (
					<div className="flex mr-10 justify-center items-center">
						<input className="rounded-lg h-5 w-5" type="radio" id="selectcontact" name="selectcontact" required />
					</div>
				)}
				<img className="w-14 h-14 rounded-full mr-3" src={createImageFromInitials(100, name, getRandomColor(), "#FFFFFF")} alt="image_1" />
				<div className="text-sm flex flex-col justify-center">
					<p className="text-gray-900 text-xs mb-2">{contact.fname + " " + contact.lname}</p>
					<p className="text-gray-600 text-xs">{"+" + contact.phoneNumber}</p>
				</div>
				{needCheckBox && (
					<div className="flex ml-24 justify-center items-center">
						<input className="rounded-lg h-5 w-5" type="checkbox" id="selectcontact" required />
					</div>
				)}
			</div>
		</>
	);
}
