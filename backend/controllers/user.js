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
exports.updateBusinessProfile = async (req, res) => {
	const user = await User.findOne({
		phoneNumberID: req.session.phoneNumberID,
	});
	if (!user) {
		return res.status(404).json({
			stat: "error",
			message: "User does not exist.",
		});
	}
	await axios
		.post(
			`${process.env.WABAPI}/${req.session.phoneNumberID}/whatsapp_business_profile`,
			{
				messaging_product: "whatsapp",
				...req.body,
			},
			{
				headers: {
					Authorization: `Bearer ${req.session.accessToken}`,
					Accept: "*/*",
					"Content-Type": "application/json; charset=utf-8",
				},
			}
		)
		.then(async (wares) => {
			if (wares.status !== 200) {
				return res.status(wares.status).json({
					stat: "error",
					message: "Something went wrong.",
				});
			} else {
				const updatedUser = await User.updateOne(
					{
						phoneNumberID: req.session.phoneNumberID,
						accessToken: req.session.accessToken,
					},
					{
						businessProfile: {
							...user.businessProfile,
							...req.body,
						},
					}
				);
				if (!updatedUser) {
					return res.status(e?.response?.status || 500).json({
						stat: "error",
						message: e?.response?.statusText || "Something went wrong.",
					});
				} else {
					return res.json({
						stat: "success",
						message: "User profile updated successfully.",
					});
				}
			}
		})
		.catch((e) => {
			return res.status(e?.response?.status || 500).json({
				stat: "error",
				message: e?.response?.data.error.message || "Something went wrong.",
			});
		});
};
