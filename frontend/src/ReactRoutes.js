import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Pages/Home";
import BroadcastLists from "./Pages/BroadcastLists";
import Contacts from "./Pages/Contacts";
import NewBroadcastList from "./Pages/NewBroadcastList";
import NewContact from "./Pages/NewContact";
import Settings from "./Pages/Settings";
import DeleteBroadcastLists from "./Pages/DeleteBroadcastLists";
import DeleteContacts from "./Pages/DeleteContacts";
import BusinessProfile from "./Pages/BussinessProfile";
import Notifications from "./Components/Notifications";
import NewMessage from "./Pages/Newmessage";
const ReactRoutes = () => {
	const [loggedIn, setLoggedIn] = useState(0);
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={loggedIn ? <Navigate to="/login" /> : <Home />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/settings" element={<Settings />} />
				<Route exact path="/contacts" element={<Contacts />} />
				<Route exact path="/newcontact" element={<NewContact />} />
				<Route exact path="/broadcastlists" element={<BroadcastLists />} />
				<Route exact path="/newbroadcastlist" element={<NewBroadcastList />} />
				<Route exact path="/deletecontacts" element={<DeleteContacts />} />
				<Route exact path="/deletebroadcastlists" element={<DeleteBroadcastLists />} />
				<Route exact path="/profile" element={<BusinessProfile />} />
				<Route exact path="/Notifications" element={<Notifications />} />
				<Route exact path="/newmessage" element={<NewMessage />} />
			</Routes>
		</Router>
	);
};
export default ReactRoutes;
