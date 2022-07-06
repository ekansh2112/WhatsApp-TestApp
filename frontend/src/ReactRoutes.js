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
import { isAuthenticated } from "./helpers/auth/authentication";
import { toast } from "react-toastify";
const ReactRoutes = () => {
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
		contactList().then((data) => {
			setListOfContacts(data);
		});
	}, []);
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
							<NewContact />
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
							<DeleteContacts ListOfContacts={listOfContacts} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/newbroadcastlist"
					element={
						<PrivateRoute>
							<NewBroadcastList ListOfContacts={listOfContacts} />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/broadcastlists"
					element={
						<PrivateRoute>
							<BroadcastLists />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/deletebroadcastlists"
					element={
						<PrivateRoute>
							<DeleteBroadcastLists />
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
