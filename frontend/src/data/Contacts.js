import { NewContacts_API, Contacts_API, DeleteContacts_API, SearchContacts_API } from "../backend";
import { toast } from "react-toastify";
export const newContact = (contact) => {
	return fetch(NewContacts_API, {
		credentials: "include",
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
		.catch((err) => {
			toast.error("Not able to create contact! Please try again!");
			return console.log(err);
		});
};
export const contactList = () => {
	return fetch(Contacts_API, {
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
			toast.error("Not able to get contacts! Please try again!");
			return console.log(err);
		});
};
export const deleteContact = (contact) => {
	return fetch(`${DeleteContacts_API}${contact.phoneNumber}`, {
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
			toast.error("Not able to delete contact! Please try again!");
			return console.log(err);
		});
};
export const searchContact = (contact) => {
	return fetch(`${SearchContacts_API}${contact.phoneNumber}`, {
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
			toast.error("Not able to search contact! Please try again!");
			return console.log(err);
		});
};
