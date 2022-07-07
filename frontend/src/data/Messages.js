import { SendMessage } from "../backend";
import { toast } from "react-toastify";
export const newMessage = (message) => {
	return fetch(SendMessage, {
		credentials: "include",
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			toast.error("Not able to send message! Please try again!");
			return console.log(err);
		});
};
