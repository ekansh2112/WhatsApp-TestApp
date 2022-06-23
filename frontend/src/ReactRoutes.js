import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Pages/Home";
const ReactRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route exact path="/home" element={<Home />} />
				<Route exact path="/" element={<Login/>} />
				<Route exact path="/Register" element={<Register/>} />
			</Routes>
		</Router>
	);
};
export default ReactRoutes;
