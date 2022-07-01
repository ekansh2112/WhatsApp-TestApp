import { Login_API, Register_API, isAuthenticated_API } from "../../backend";
export const signup = (user) => {
	return fetch(Register_API, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/json; charset=utf-8"
		},
		body: JSON.stringify({
			messaging_product: "whatsapp",
			address: "hello"
		})
	})
		.then()
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const signin = (user) => {
	return fetch(Login_API, {
		credentials: "include",
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then()
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const isAuthenticated = () => {
	return fetch(isAuthenticated_API, {
		credentials: "include",
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then()
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
// export const signout = (next) => {
// 	const tokenValue = localStorage.getItem("token").replace(/['"]+/g, "");
// 	if (typeof window !== undefined) {
// 		localStorage.removeItem("token");
// 		return fetch(isAuthenticated, {
// 			method: "POST",
// 			headers: {
// 				Authorization: "Token " + tokenValue,
// 			},
// 			body: {},
// 		})
// 			.then((response) => {
// 				if (response?.status === 403 || response?.status === 401) {
// 					return toast(`Something went wrong! Status: ${response.statusText}`, {
// 						type: "error",
// 						autoClose: 5000,
// 						position: "bottom-center",
// 						hideProgressBar: false,
// 						pauseOnHover: true,
// 						pauseOnFocusLoss: true,
// 					});
// 				}
// 				return response.json();
// 			})
// 			.then((data) => {
// 				next(data);
// 			})
// 			.catch((err) => console.log(err));
// 	}
// };
