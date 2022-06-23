import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
const ReactRoutes = () => {
	const [loggedIn, setLoggedIn] = useState(0);
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={loggedIn ? <Navigate to="/login" /> : <Home />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/settings" element={<Settings />} />
			</Routes>
		</Router>
	);
};
export default ReactRoutes;
