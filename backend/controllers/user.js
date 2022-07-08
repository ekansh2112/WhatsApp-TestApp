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
	console.log(req.body);
	console.log(req.session.phoneNumberID), " IN UPDATE PROFILE";
	const user = await User.findOne({
		phoneNumberID: req.session.phoneNumberID
	});
	if (!user) {
		return res.status(404).json({
			stat: "error",
			message: "User does not exist."
		});
	}
	// console.log("CURR2 USER", user);
	await axios
		.post(
			`${process.env.WABAPI}/${req.session.phoneNumberID}/whatsapp_business_profile`,
			{
				messaging_product: "whatsapp",
				...req.body
			},
			{
				headers: {
					Authorization: `Bearer ${req.session.accessToken}`,
					Accept: "*/*",
					"Content-Type": "application/json; charset=utf-8"
				}
			}
		)
		.then(async (wares) => {
			console.log("_____________________________", wares.status);
			if (wares.status !== 200) {
				return res.status(wares.status).json({
					stat: "error",
					message: "Something went wrong."
				});
			} else {
				const updatedUser = await User.updateOne(
					{
						phoneNumberID: req.session.phoneNumberID,
						accessToken: req.session.accessToken
					},
					{
						businessProfile: {
							...user.businessProfile,
							...req.body
						}
					}
				);
				if (!updatedUser) {
					return res.status(e?.response?.status || 500).json({
						stat: "error",
						message: e?.response?.statusText || "Something went wrong."
					});
				} else {
					console.log("UPDATED", updatedUser);
					return res.json({
						stat: "success",
						message: "User profile updated successfully."
					});
				}
			}
		})
		.catch((e) => {
			console.log("CATCH", e.response);
			return res.status(e?.response?.status || 500).json({
				stat: "error",
				message: e?.response?.data.error.message || "Something went wrong."
			});
		});
};

/**
 * 
 try {
					await this.getBusinessProfile(req.session.phoneNumberID, req.session.accessToken, (wabpres) => {
						if (wabpres.status != 200) {
							return res.status(wabpres.status).json({
								stat: "error",
								message: wabpres.statusText
							});
						}
						// console.log("PROF", wabpres.data.data?.[0], user.businessProfile);
						const updatedUser = User.updateOne(
							{
								phoneNumberID: req.session.phoneNumberID
							},
							{
								businessProfile: wabpres.data.data?.[0]
							}
						);
						// console.log(updatedUser);
						if (!updatedUser) {
							return res.status(400).json({
								stat: "error",
								message: "User profile not updated."
							});
						}
					});
					return res.json({
						stat: "success",
						message: "User profile updated successfully."
					});
				} catch (e) {
					return res.status(400).json({
						stat: "error",
						message: "User profile not updated."
					});
				}
 */
