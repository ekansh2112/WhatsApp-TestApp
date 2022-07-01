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
		.then()
		.then((response) => {
			console.log(response, "idgaf33773");
			return response.json();
		})
		.catch((err) => console.log(err));
};
