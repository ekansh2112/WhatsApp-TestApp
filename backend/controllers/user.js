const User = require("../models/user");
const axios = require("axios").default;
require("dotenv").config();

exports.getBusinessProfile = async (phoneNumberID, accessToken, next) => {
	await axios
		.get(`${process.env.WABAPI}/${phoneNumberID}/whatsapp_business_profile?fields=address,description,vertical,email,websites`, {
			headers: {
				Accept: "*/*",
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((wares) => {
			next(wares);
		});
};
