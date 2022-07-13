import { NewBroadcastLists_API, DeleteBroadcastLists_API, BroadcastLists_API } from "../backend";
import { toast } from "react-toastify";
export const newBroadcastList = async (broadcastlist) => {
	return await fetch(NewBroadcastLists_API, {
		credentials: "include",
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(broadcastlist),
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			toast.error("Not able to add broadcast list! Please try again!");
			return console.log(err);
		});
};
export const broadcastLists = async () => {
	return await fetch(BroadcastLists_API, {
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
			return response;
		})
		.catch((err) => {
			toast.error("Not able to get broadcast lists! Please try again!");
			return console.log(err);
		});
};
export const deleteBroadcastList = async (broadcastlist) => {
	return await fetch(`${DeleteBroadcastLists_API}${broadcastlist.title}`, {
		credentials: "include",
		method: "DELETE",
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
			toast.error("Not able to delete broadcast list! Please try again!");
			return console.log(err);
		});
};
