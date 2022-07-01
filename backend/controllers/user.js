const User = require("../models/user");
const axios = require("axios").default;
require("dotenv").config();

exports.getBusinessProfile = async (phoneNumberID, accessToken, next) => {
	await axios
		.get(`${process.env.WABAPI}/${phoneNumberID}/whatsapp_business_profile?fields=address,description,vertical,email,websites`, {
			headers: {
				Accept: "*/*",
				Authorization: `Bearer ${accessToken}`
			}
		})
		.then((wares) => {
			next(wares);
		});
};

exports.updateBusinessProfile = async (req, res) => {
	console.log("afaefaeaw", req.body);
	console.log(req.session.phoneNumberID), " IN UPDATE PROFILE";
	await axios
		.post(`${process.env.WABAPI}	${req.session.phoneNumberID}/whatsapp_business_profile`, {
			headers: {
				Authorization: `Bearer ${req.session.accessToken}`,
				Accept: "*/*",
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify({
				messaging_product: "whatsapp",
				...req.body
			})
		})
		.then((res) => {
			console.log("_____________________________", res);
			return res.json({
				stat: "working"
			});
		})
		.catch((err) => {
			console.log(err.response?.data);
			return res.status(500).json({
				stat: "error"
			});
		});
};
