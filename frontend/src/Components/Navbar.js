import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/solid";
import { signout } from "../helpers/auth/authentication.js";
import { toast } from "react-toastify";
import Logo from "../Assets/TallyXWhatsApp.svg";
export default function Navbar() {
	const [viewDropDown, setViewDropDown] = useState(false);
	const [newNotification, setNewNotification] = useState(false);
	const navigate = useNavigate();
	const signOutUser = (e) => {
		e.preventDefault();
		signout()
			.then((data) => {
				if (data?.stat === "success") {
					toast.success(data?.message);
					navigate("/login");
				} else if (data?.stat === "error") {
					return toast.error(data?.message);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<>
			<nav className="mx-14 my-5 px-5">
				<div className="relative flex items-center justify-between h-16">
					<div className="flex-shrink-0 flex items-center">
						<img className="w-auto h-10" src={Logo} alt="TallyXWhatsApp Logo" />
					</div>
					<div className="block ml-6">
						<div className="flex">
							<Link className="px-3 py-2 mx-4 text-sm font-medium" to="/newmessage">
								<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.069 17.845">
									<path
										d="M19.005,3.175H4.674A1.53249,1.53249,0,0,0,3,4.821V21.02l3.544-3.514H19.005a2.24553,2.24553,0,0,0,2.064-2.093V4.821A1.87192,1.87192,0,0,0,19.005,3.175Zm-4.989,9.869H7.041V11.1h6.975Zm3-4H7.041V7.1h9.975Z"
										transform="translate(-3 -3.175)"
									/>
								</svg>
							</Link>
							<Link className="px-3 py-2 mx-4 text-sm font-semibold uppercase" to="/">
								Home
							</Link>
							<Link className="px-3 py-2 mx-4 text-sm font-semibold uppercase" to="/contacts">
								Contacts
							</Link>
							<Link className="px-3 py-2 mx-4 text-sm font-semibold uppercase" to="/broadcastlists">
								Broadcast Lists
							</Link>
							<Link className="px-3 py-2 mx-4 text-sm font-semibold uppercase" to="/settings">
								Settings
							</Link>
							<Link className="p-1 mx-4 flex items-center rounded-full" to="/notifications">
								<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
								{newNotification && <span className="newnotification" />}
							</Link>
							<div className="ml-4 grid">
								<button
									type="button"
									className="flex items-center text-sm rounded-full"
									onClick={() => {
										setViewDropDown(!viewDropDown);
									}}
								>
									<UserCircleIcon className={viewDropDown ? "h-8 w-8 bgOnProfileButton" : "h-8 w-8"} />
								</button>
								{viewDropDown && (
									<div className="absolute flex flex-col right-0 top-16 h-48 rounded-2xl dropdownShadow p-2 bg-white">
										<Link className="px-4 py-3 text-sm font-semibold uppercase" to="/profile">
											PROFILE
										</Link>
										<Link className="px-4 py-3 text-sm font-semibold uppercase" to="/deletecontacts">
											DELETE CONTACTS
										</Link>
										<Link className="px-4 py-3 text-sm font-semibold uppercase" to="/deletebroadcastlists">
											DELETE BROADCAST LISTS
										</Link>
										<Link
											className="px-4 py-3 text-sm font-semibold uppercase"
											to=""
											onClick={(e) => {
												signOutUser(e);
											}}
										>
											SIGN OUT
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
