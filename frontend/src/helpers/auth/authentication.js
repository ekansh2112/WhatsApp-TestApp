import { Login_API, Register_API, isAuthenticated_API } from "../../backend";
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
		.catch((err) => console.log(err));
};
export const signin = (user, next) => {
	console.log("signin");
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
			console.log(response, "idgaf7277272");
			return response.json();
		})
		.then((response) => {
			next(response);
		})
		.catch((err) => console.log(err));
};
export const isAuthenticated = () => {
	return fetch(isAuthenticated_API, {
		credentials: "include",
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			console.log(response, "IS AUTH");
		})
		.catch((err) => console.log(err));
};
export const signout = (next) => {
	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
	if (typeof window !== undefined) {
		localStorage.removeItem("token");
		return fetch(isAuthenticated, {
			method: "POST",
			headers: {
				Authorization: "Token " + tokenValue,
			},
			body: {},
		})
			.then((response) => {
				if (response?.status === 403 || response?.status === 401) {
					return toast(`Something went wrong! Status: ${response.statusText}`, {
						type: "error",
						autoClose: 5000,
						position: "bottom-center",
						hideProgressBar: false,
						pauseOnHover: true,
						pauseOnFocusLoss: true,
					});
				}
				return response.json();
			})
			.then((data) => {
				next(data);
			})
			.catch((err) => console.log(err));
	}
};
