import { ProfileUpdate_API } from "../backend";
import { toast } from "react-toastify";
export const profileDataUpdate = (data) => {
	return fetch(ProfileUpdate_API, {
		credentials: "include",
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response;
		})
		.catch((err) => {
			toast.error("Not able to update profile! Please try again!");
			return console.log(err);
		});
};
