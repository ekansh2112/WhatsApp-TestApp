import React from "react";
export default function RecentChat({ last, active }) {
	return (
		<>
			<div className="mx-10 ml-14 p-7 bg-white removeScrollbar overflow-y-scroll rounded-3xl" style={{ height: "616px", width: "315px" }}>
				<div className={last ? "flex rounded-full items-center" : active ? "flex mb-4 bgOnRecentChat rounded-full items-center" : "flex mb-4 rounded-full items-center"}>
					<img className="w-14 h-14 rounded-full mr-3" src="" alt="Image_1" />
					<div className="text-sm">
						<p className="text-xs mb-2"></p>
						<p className="text-xs mt-2"></p>
					</div>
				</div>
			</div>
		</>
	);
}
