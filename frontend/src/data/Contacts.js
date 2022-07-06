import { NewContacts_API, Contacts_API, DeleteContacts_API } from "../backend";
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
			console.log(response);
			return response;
		})
		.catch((err) => console.log(err));
};
export const contactList = () => {
	return fetch(`${Contacts_API}/all`, {
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
		});
};
export const deleteContact = (contact) => {
	return fetch(`${DeleteContacts_API}${contact.phone}/delete`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(contact),
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => console.log(err));
};
