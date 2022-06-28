import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import Notifications from "./Pages/Notifications";
import NewMessage from "./Pages/NewMessage";
import { toast } from "react-toastify";
import { isAuthenticated, signout } from "./helpers/auth/authentication";
import { profileData } from "./data/users/profileData";
import { BaseContext } from "./Context";
import { useCookies } from "react-cookie";
const ReactRoutes = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const logoutUser = (event) => {
		event.preventDefault();
		signout((data) => {
			removeCookie("user", { path: "/" });
			return toast(data?.detail, { type: "success", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		});
	};
	useEffect(() => {
		if (isAuthenticated()) {
			profileData((statusText, status) => {
				if (status === 403 || status === 401) {
					localStorage.removeItem("token");
					removeCookie("user", { path: "/" });
					handleNotification(`Something went wrong! Status: ${statusText}`, "error");
				}
			}).then((data) => {
				setCookie("user", data, { path: "/" });
			});
		} else {
			removeCookie("user", { path: "/" });
		}
	}, [isAuthenticated()]);
	function requireAuth(nextState, replace, next) {
		if (!(isAuthenticated() && cookies.user)) {
			replace({
				pathname: "/signin",
				state: { nextPathname: nextState.location.pathname },
			});
		}
		next();
	}

	// ANCHOR Notifications
	const [notification, setNotification] = useState("");
	const [notificationType, setNotificationType] = useState("");
	const [toggleNotification, setToggleNotification] = useState(false);
	const handleNotification = (message, type) => {
		setNotification(message);
		setNotificationType(type);
		setToggleNotification(!toggleNotification);
	};
	useEffect(() => {
		if (notificationType === "success") {
			return toast(notification, { type: "success", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		}
		if (notificationType === "error") {
			return toast(notification, { type: "error", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		}
		if (notificationType === "warning") {
			return toast(notification, { type: "warning", autoClose: 5000, position: "bottom-center", hideProgressBar: false, pauseOnHover: true, pauseOnFocusLoss: true });
		}
	}, [toggleNotification]);
	// ANCHOR Remember Me
	const [rememberMe, setRememberMe] = useState(true);
	const handleRememberMe = (e) => {
		const input = e.target;
		const value = input.type === "checkbox" ? input.checked : input.value;
		setRememberMe(value);
	};
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			if (!rememberMe) {
				window.addEventListener("unload", signout);
				return () => {
					window.removeEventListener("unload", signout);
				};
			}
		}
		return () => {
			mounted = false;
		};
	});
	const [loggedIn, setLoggedIn] = useState(0);
	return (
		<BaseContext.Provider
			value={{
				logoutUser,
				notification,
				notificationType,
				handleNotification,
				cookies,
				setCookie,
			}}
		>
			<BrowserRouter>
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
					<Route exact path="/notifications" element={<Notifications />} />
					<Route exact path="/newmessage" element={<NewMessage />} />
				</Routes>
			</BrowserRouter>
		</BaseContext.Provider>
	);
};
export default ReactRoutes;
