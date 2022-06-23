import React from "react";
export default function RecentChat({ last, second }) {
	return (
		<>
			<div className={last ? "flex rounded-full items-center" : second ? "flex mb-4 bg-blue-300 rounded-full items-center" : "flex mb-4 rounded-full items-center"}>
				<img
					className="w-14 h-14 rounded-full mr-3"
					src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					alt="Image_1"
				/>
				<div className="text-sm">
					<p className="text-gray-900 text-xs mb-2 leading-none">John Smith</p>
					<p className="text-gray-600 text-xs mt-2">Lorem ipsum dolor sit uhd ijwd</p>
				</div>
			</div>
		</>
	);
}
