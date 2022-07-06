import React from "react";
import List from "../Components/List";
import Base from "../Base";
export default function DeleteBroadcastLists() {
	const disp = () => {
		let arr = [];
		for (let i = 0; i < 12; i++) {
			arr.push(<List key={i} needMB={true} needCheckBox={true} />);
		}
		return arr;
	};
	return (
		<>
			<Base>
				<section className="flex justify-center items-center mt-20">
					<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
						<input className="rounded-lg self-center inputShadow h-9 w-full mt-1 mb-5 px-3 text-xs font-light py-3" type="search" id="search" placeholder="Search for a list" />
						<div className="flex flex-col justify-start overflow-y-scroll removeScrollbar w-full">{disp()}</div>
						<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4">DELETE</button>
					</div>
				</section>
			</Base>
		</>
	);
}
