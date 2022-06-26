import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChatAltIcon } from "@heroicons/react/solid";
export default function Navbar() {
	const [viewDropDown, setViewDropDown] = useState(false);
	return (
		<>
			<nav className="bg-gray-800">
				<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
						<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
							<div className="flex-shrink-0 flex items-center">
								<img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
								<img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
							</div>
							<div className="hidden sm:block sm:ml-6">
								<div className="flex space-x-4">
									<Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/newmessage">
										<ChatAltIcon className="h-5 w-5" />
									</Link>
									<Link className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page" to="/">
										Home
									</Link>
									<Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/contacts">
										Contacts
									</Link>
									<Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/broadcastlists">
										Broadcast Lists
									</Link>
									<Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/settings">
										Settings
									</Link>
								</div>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<Link
								to="/notifications"
								className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
							>
								<span className="sr-only">View notifications</span>
								<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
							</Link>
							<div className="ml-3 relative">
								<div>
									<button
										type="button"
										data-testid="head"
										className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
										id="user-menu-button"
										aria-expanded="false"
										aria-haspopup="true"
										onClick={() => {
											setViewDropDown(!viewDropDown);
										}}
									>
										<span className="sr-only" data-testid="h">
											Open user menu
										</span>
										<img
											className="h-8 w-8 rounded-full"
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt="navbar image"
										/>
									</button>
								</div>
								{viewDropDown && (
									<div
										className="origin-top-right absolute flex flex-col justify-center right-0 mt-2 w-60 h-52 rounded-lg shadow-lg p-3 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
										role="menu"
										aria-orientation="vertical"
										aria-labelledby="user-menu-button"
										tabIndex={-1}
									>
										<Link className="block px-4 py-3 font-medium text-sm text-gray-700" to="/profile" role="menuitem" tabIndex={-1} id="user-menu-item-0">
											PROFILE
										</Link>
										<Link className="block px-4 py-3 font-medium text-sm text-gray-700" to="/deletecontacts" role="menuitem" tabIndex={-1} id="user-menu-item-1">
											DELETE CONTACTS
										</Link>
										<Link className="block px-4 py-3 font-medium text-sm text-gray-700" to="/deletebroadcastlists" role="menuitem" tabIndex={-1} id="user-menu-item-2">
											DELETE BROADCAST LISTS
										</Link>
										<Link className="block px-4 py-3 font-medium text-sm text-gray-700" to="/login" role="menuitem" tabIndex={-1} id="user-menu-item-2">
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
