import { Register_API, Login_API, Signout_API } from "../../backend";
import { toast } from "react-toastify";
export const signup = (user) => {
	return fetch(Register_API, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			toast.error("Not able to register! Please try again!");
			return console.log(err);
		});
};
export const signin = (user) => {
	return fetch(Login_API, {
		credentials: "include",
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			toast.error("Not able to login! Please try again!");
			return console.log(err);
		});
};
export const signout = () => {
	return fetch(Signout_API, {
		credentials: "include",
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			toast.error("Not able to logout! Please try again!");
			return console.log(err);
		});
};
