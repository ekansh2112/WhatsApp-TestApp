import { SendMessage_API, SendFileMessage_API, SendBroadcastMessage_API, GetMessages_API } from "../backend";
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
export const newBroadcastMessage = (message) => {
	return fetch(SendBroadcastMessage_API, {
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
			toast.error("Not able to send broadcast message! Please try again!");
			return console.log(err);
		});
};
export const getMessages = async (phoneNumber, next) => {
	return await fetch(`${GetMessages_API}${phoneNumber}`, {
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
			next(response.messages);
			return response;
		})
		.catch((err) => {
			toast.error("Not able to get message! Please try again!");
			return console.log(err);
		});
};
