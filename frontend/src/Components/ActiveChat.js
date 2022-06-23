import React from "react";
export default function ActiveChat() {
	return (
		<>
			<div className="flex rounded-lg bg-green-200 items-center pl-6 py-3">
				<img
					className="w-14 h-14 rounded-full mr-3"
					src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					alt="image_1"
				/>
				<div className="text-sm">
					<p className="text-gray-900 text-xs mb-2 leading-none">John Smith</p>
					<p className="text-gray-600 text-xs mt-2">9837528372</p>
				</div>
			</div>
		</>
	);
}
