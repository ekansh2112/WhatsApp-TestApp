import { NewBroadcastLists_API, DeleteBroadcastLists_API, BroadcastLists_API } from "../backend";
export const newBroadcastList = (broadcastlist) => {
	return fetch(NewBroadcastLists_API, {
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
			console.log(response);
			return response;
		})
		.catch((err) => console.log(err));
};
export const broadcastLists = () => {
	return fetch(`${BroadcastLists_API}/all`, {
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
			console.log(response);
			return response;
		});
};
export const deleteBroadcastList = (broadcastlist) => {
	return fetch(`${DeleteBroadcastLists_API}${broadcastlist.phone}/delete`, {
		method: "DELETE",
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
		.catch((err) => console.log(err));
};
