import React from "react";
import ReactDOM from "react-dom/client";
import ReactRoutes from "./ReactRoutes";
import { CookiesProvider } from "react-cookie";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<CookiesProvider>
			<ReactRoutes />
		</CookiesProvider>
	</React.StrictMode>
);
