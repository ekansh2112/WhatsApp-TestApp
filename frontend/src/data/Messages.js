import { SendMessage_API, SendFileMessage_API } from "../backend";
import { toast } from "react-toastify";
export const newMessage = (message) => {
	return fetch(SendMessage_API, {
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
export const newFileMessage = (fileMessage) => {
	return fetch(SendFileMessage_API, {
		credentials: "include",
		method: "POST",
		body: fileMessage,
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			toast.error("Not able to send files! Please try again!");
			return console.log(err);
		});
};
