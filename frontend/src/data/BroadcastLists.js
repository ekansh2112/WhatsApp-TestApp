import { NewBroadcastLists_API, DeleteBroadcastLists_API, BroadcastLists_API, SearchBroadcastList_API } from "../backend";
export const newBroadcastList = async (broadcastlist) => {
	return await fetch(NewBroadcastLists_API, {
		credentials: "include",
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(broadcastlist)
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => console.log(err));
};
export const broadcastLists = async () => {
	return await fetch(BroadcastLists_API, {
		credentials: "include",
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			console.log("RES", response);
			return response;
		})
		.catch((err) => console.log(err));
};
export const deleteBroadcastList = async (broadcastlist) => {
	return await fetch(`${DeleteBroadcastLists_API}${broadcastlist.title}`, {
		credentials: "include",
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => console.log(err));
};
//FIXME: API NOT WORKING...API MENTIONED IN CONTROLLER NOT WORKING`
export const searchBroadcastList = (broadcastlist) => {
	return fetch(`${SearchBroadcastList_API}?${broadcastlist.title}`, {
		credentials: "include",
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => console.log(err));
};
