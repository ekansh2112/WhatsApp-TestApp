import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import BroadcastLists from "./Pages/BroadcastLists";
import Contacts from "./Pages/Contacts";
import NewBroadcastList from "./Pages/NewBroadcastList";
import NewContact from "./Pages/NewContact";
import Settings from "./Pages/Settings";
import DeleteBroadcastLists from "./Pages/DeleteBroadcastLists";
import DeleteContacts from "./Pages/DeleteContacts";
import BusinessProfile from "./Pages/BussinessProfile";
import NewMessage from "./Pages/NewMessage";
import { contactList } from "./data/Contacts";
import { broadcastLists } from "./data/BroadcastLists";
const ReactRoutes = () => {
	// ANCHOR Props
	const [crudContactList, setCrudContactList] = useState(false);
	const [crudBroadcastList, setCrudBroadcastList] = useState(false);
	const [authToggle, setAuthToggle] = useState(false);
	const [latestChat, setLatestChat] = useState();

	// ANCHOR Cookies
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);

	// ANCHOR User & Auth
	function PrivateRoute({ children }) {
		if (cookies.user) {
			return children;
		} else {
			// TODO 2 times
			// toast.error("You need to login first!");
			return <Navigate to="/login" />;
		}
	}

	// ANCHOR Contacts
	const [listOfContacts, setListOfContacts] = useState([]);
	useEffect(() => {
		if (cookies.user) {
			contactList().then((data) => {
				setListOfContacts(data);
			});
		}
	}, [crudContactList, authToggle]);

	// ANCHOR Broadcast Lists
	const [listOfBroadcastLists, setListOfBroadcastLists] = useState([]);
	useEffect(() => {
		if (cookies.user) {
			broadcastLists().then((data) => {
				setListOfBroadcastLists(data);
			});
		}
	}, [crudBroadcastList, authToggle]);

	//ANCHOR Chats
	const [chats, setChats] = useState([]);
	const [toggle, setToggle] = useState(false);
	useEffect(() => {
		var arr = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key.includes("91")) {
				arr.push({ contact: key, data: JSON.parse(localStorage.getItem(key)) });
			}
		}
		arr.sort((a, b) => {
			return parseInt(b.data[b.data.length - 1].time) - parseInt(a.data[a.data.length - 1].time);
		});
		setChats(arr);
		if (JSON.parse(localStorage.getItem("latestNumber"))) {
			setLatestChat(arr.find((data) => data?.contact === localStorage.getItem("latestNumber")));
		} else {
			setLatestChat(arr[0]);
		}
	}, [toggle, authToggle]);
	console.log(chats, "CHATS");
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/register" element={cookies.user ? <Navigate to="/" /> : <Register />} />
				<Route exact path="/login" element={cookies.user ? <Navigate to="/" /> : <Login setAuthToggle={setAuthToggle} authToggle={authToggle} />} />
				<Route
					exact
					path="/"
					element={
						<PrivateRoute>
							<Home chats={chats} toggle={toggle} setToggle={setToggle} latestChat={latestChat} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/newmessage"
					element={
						<PrivateRoute>
							<NewMessage ListOfContacts={listOfContacts} toggle={toggle} setToggle={setToggle} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/newcontact"
					element={
						<PrivateRoute>
							<NewContact crudContactList={crudContactList} setCrudContactList={setCrudContactList} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/contacts"
					element={
						<PrivateRoute>
							<Contacts ListOfContacts={listOfContacts} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/deletecontacts"
					element={
						<PrivateRoute>
							<DeleteContacts toggle={toggle} setToggle={setToggle} ListOfContacts={listOfContacts} crudContactList={crudContactList} setCrudContactList={setCrudContactList} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/newbroadcastlist"
					element={
						<PrivateRoute>
							<NewBroadcastList ListOfContacts={listOfContacts} crudBroadcastList={crudBroadcastList} setCrudBroadcastList={setCrudBroadcastList} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/broadcastlists"
					element={
						<PrivateRoute>
							<BroadcastLists ListOfBroadcastLists={listOfBroadcastLists} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/deletebroadcastlists"
					element={
						<PrivateRoute>
							<DeleteBroadcastLists ListOfBroadcastLists={listOfBroadcastLists} crudBroadcastList={crudBroadcastList} setCrudBroadcastList={setCrudBroadcastList} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/settings"
					element={
						<PrivateRoute>
							<Settings />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/profile"
					element={
						<PrivateRoute>
							<BusinessProfile />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};
export default ReactRoutes;
