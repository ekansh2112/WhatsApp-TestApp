import React from "react";
import { UserIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import Base from "../Base";
export default function NewMessageSelect() {
	return (
		<>
			<Base>
				<section className="flex justify-center items-center mt-28">
					<div className="rounded-lg p-7 justify-between flex w-1/3 flex-row bgOnChatPanel" style={{ height: "300px" }}>
						<Link className="flex flex-col text-center text-lg font-semibold w-48 justify-center items-center p-10 bg-white rounded-2xl" to="/newmessagetocontact">
							<figure className={"w-14 h-14 mb-5 bgOnButton2 flex justify-center items-center rounded-full"}>
								<UserIcon className="h-7 w-7 fontColorOnButton inline" />
							</figure>
							Message A Contact
						</Link>
						<Link className="flex flex-col text-center text-lg font-semibold w-48 justify-center items-center p-10 bg-white rounded-2xl" to="/newmessagetobroadcastlist">
							<figure className={"w-14 h-14 mb-5 bgOnButton2 flex justify-center items-center rounded-full"}>
								<UserGroupIcon className="h-7 w-7 fontColorOnButton inline" />
							</figure>
							Broadcast A Message
						</Link>
					</div>
				</section>
			</Base>
		</>
	);
}
