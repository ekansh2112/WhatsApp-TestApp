import { ProfileUpdate_API } from "../../backend";
export const profileDataUpdate = async (uploadData, next) => {
	return await fetch(ProfileUpdate_API, {
		method: "POST",
		headers: {
			Authorization: "Token " + tokenValue,
		},
		body: uploadData,
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
