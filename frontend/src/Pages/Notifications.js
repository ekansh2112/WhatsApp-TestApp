import React from "react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
import RecentChat from "../Components/RecentChat";
import Base from "../Base";
export default function Notifications() {
	let disp = () => {
		let arr = [];
		for (let i = 0; i < 37; i++) {
			arr.push(<RecentChat />);
		}
		return arr;
	};
	return (
		<>
			<Base>
				<div className="relative z-10">
					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<div className="pointer-events-auto relative w-96 max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-2xl">
										<div className="flex justify-between items-center px-6">
											<Link className="crossbutton3" to="/">
												<XCircleIcon className="h-8 w-8" />
											</Link>
											<button className="rounded-full h-8 w-32 bg-yellow-400 text-xs font-medium">Mark all as read</button>
										</div>
										<div className="relative mt-6 flex-1 px-9">
											<div className="absolute inset-0 px-9">{disp()}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Base>
		</>
	);
}
