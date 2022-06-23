import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Redirect, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Pages/Home";
const ReactRoutes = () => {
	const [loggedIn, setLoggedIn] = useState(1);
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={loggedIn ? <Navigate to="/login" /> : <Home />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
			</Routes>
		</Router>
	);
};
export default ReactRoutes;
