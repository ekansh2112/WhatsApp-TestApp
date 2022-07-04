import { NewContacts_API } from "../../backend";
export const newContact = (contact) => {
	return fetch(NewContacts_API, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(contact),
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => console.log(err));
};
