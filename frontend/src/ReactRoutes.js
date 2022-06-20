import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
const ReactRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home />} />
			</Routes>
		</Router>
	);
};
export default ReactRoutes;
