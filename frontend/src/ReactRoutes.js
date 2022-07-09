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

	// ANCHOR Cookies
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const [user, setUser] = useState({
		wabaID:"",
		phoneNumberID:"",
		businessProfile: {
			address:"",
			description: "",
			vertical: "",
			email: "",
			websites: [],
			messaging_product: "",
		},
	});
	const {
		wabaID,
		phoneNumberID,
		businessProfile: { address, description, vertical, email, websites, messaging_product },
	} = user;


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
	}, [crudContactList]);

	// ANCHOR Broadcast Lists
	const [listOfBroadcastLists, setListOfBroadcastLists] = useState([]);
	useEffect(() => {
		if (cookies.user) {
			broadcastLists().then((data) => {
				setListOfBroadcastLists(data);
			});
		}
	}, [crudBroadcastList]);
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/register" element={cookies.user ? <Navigate to="/" /> : <Register />} />
				<Route exact path="/login" element={cookies.user ? <Navigate to="/" /> : <Login />} />
				<Route
					exact
					path="/"
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/newmessage"
					element={
						<PrivateRoute>
							<NewMessage ListOfContacts={listOfContacts} />
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
							<DeleteContacts ListOfContacts={listOfContacts} crudContactList={crudContactList} setCrudContactList={setCrudContactList} />
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
