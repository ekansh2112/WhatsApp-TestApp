import React from "react";
export default function Contact({ needMB, needCheckBox, needRadio }) {
	return (
		<>
			<div className={needMB && (needCheckBox || needRadio) ? "flex mb-3 justify-center" : needMB ? "flex mb-3" : "flex"}>
				{needRadio && (
					<div className="flex mr-10 justify-center items-center">
						<input className="rounded-lg h-5 w-5 focus:outline-none" type="radio" id="selectcontact" name="selectcontact" required></input>
					</div>
				)}
				<img
					className="w-14 h-14 rounded-full mr-3"
					src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					alt="image_1"
				/>
				<div className="text-sm flex flex-col justify-center">
					<p className="text-gray-900 text-xs mb-2">John Smith</p>
					<p className="text-gray-600 text-xs">9837528372</p>
				</div>
				{needCheckBox && (
					<div className="flex ml-24 justify-center items-center">
						<input className="rounded-lg h-5 w-5 focus:outline-none" type="checkbox" id="selectcontact" required></input>
					</div>
				)}
			</div>
		</>
	);
}
