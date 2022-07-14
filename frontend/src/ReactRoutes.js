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
import NewMessageSelect from "./Pages/NewMessageSelect";
import NewMessageContact from "./Pages/NewMessageContact";
import NewMessageBroadcast from "./Pages/NewMessageBroadcast";
import { contactList } from "./data/Contacts";
import { broadcastLists } from "./data/BroadcastLists";
import { getMessages } from "./data/Messages";
const ReactRoutes = () => {
	const [crudContactList, setCrudContactList] = useState(false);
	const [crudBroadcastList, setCrudBroadcastList] = useState(false);
	const [authToggle, setAuthToggle] = useState(false);
	const [latestChat, setLatestChat] = useState();

	const [cookies, setCookie, removeCookie] = useCookies(["user"]);

	function PrivateRoute({ children }) {
		if (cookies.user) {
			return children;
		} else {
			return <Navigate to="/login" />;
		}
	}

	const [listOfContacts, setListOfContacts] = useState([]);
	useEffect(() => {
		if (cookies.user) {
			contactList().then((data) => {
				setListOfContacts(data);
			});
		}
	}, [crudContactList, authToggle]);

	const [listOfBroadcastLists, setListOfBroadcastLists] = useState([]);
	useEffect(() => {
		if (cookies.user) {
			broadcastLists().then((data) => {
				setListOfBroadcastLists(data);
			});
		}
	}, [crudBroadcastList, authToggle]);

	const [chats, setChats] = useState([]);
	const [toggle, setToggle] = useState(false);
	useEffect(() => {
		var arr = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key.includes("91")) {
				arr.push({ name: key, data: JSON.parse(localStorage.getItem(key)) });
			}
		}
		// arr.sort((a, b) => {
		// 	return parseInt(b.data[b.data.length - 1].time) - parseInt(a.data[a.data.length - 1].time);
		// });
		setChats(arr);
		if (JSON.stringify(localStorage.getItem("latestChatOnTop"))) {
			setLatestChat(arr.find((data) => data?.name === localStorage.getItem("latestChatOnTop")));
		} else {
			setLatestChat(arr[0]);
		}
	}, [toggle, authToggle]);
	useEffect(() => {
		let timer1 = setInterval(() => {
			listOfContacts &&
				listOfContacts.length &&
				listOfContacts?.map((data) => {
					return getMessages(data?.phoneNumber, (msg) => {
						let arr = [];
						msg &&
							msg.length > 0 &&
							msg.map((msgData, msgKey) => {
								arr.push({
									type: msgData.type,
									time: msgData.time,
									profile: {
										phoneNumber: data.phoneNumber,
										fname: data.fname,
										lname: data.lname,
										image: data.image,
									},
									detail: {
										message: msgData.message,
										messageType: msgData.messageType,
									},
									count: msgData.count,
								});
							});
						if (arr.length > 0) localStorage.setItem(data?.phoneNumber, JSON.stringify(arr));
					});
				});
		}, 2000);
		return () => {
			clearInterval(timer1);
		};
	}, [listOfContacts]);
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
					path="/newmessageselect"
					element={
						<PrivateRoute>
							<NewMessageSelect />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/newmessagetocontact"
					element={
						<PrivateRoute>
							<NewMessageContact ListOfContacts={listOfContacts} toggle={toggle} setToggle={setToggle} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/newmessagetobroadcastlist"
					element={
						<PrivateRoute>
							<NewMessageBroadcast ListOfBroadcastLists={listOfBroadcastLists} toggle={toggle} setToggle={setToggle} />
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
							<DeleteBroadcastLists
								ListOfBroadcastLists={listOfBroadcastLists}
								crudBroadcastList={crudBroadcastList}
								setCrudBroadcastList={setCrudBroadcastList}
								toggle={toggle}
								setToggle={setToggle}
							/>
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
