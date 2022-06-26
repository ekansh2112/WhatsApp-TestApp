const User = require("../models/user");
const axios = require("axios").default;
require("dotenv").config();

exports.signUp = async (req, res) => {
	const isUser = await User.findOne({ wabaId: req.body.wabaID });
	if (isUser != undefined) {
		return res.json({
			stat: "error",
			message: "User already exists",
		});
	}
	const userData = {
		wabaID: req.body.wabaID,
		accessToken: req.body.accessToken,
		// phoneNumber: req.body.phoneNumber,
	};
	await axios
		.get(`${process.env.WABAPI}/${userData.wabaID}/phone_numbers`, {
			headers: {
				Accept: "*/*",
				Authorization: `Bearer ${userData.accessToken}`,
			},
		})
		.then((wares) => {
			// console.log("_________________", wares.status);
			if (wares.status != 200) {
				return res.status(wares.status).json({
					stat: "error",
					message: wares.statusText,
				});
			}
			// console.log(wares.data.data);
			const arr = wares.data.data;
			if (arr.find((number) => req.body.phoneNumber === number.display_phone_number)) {
				const phoneNumberID = arr.find((number) => req.body.phoneNumber === number.display_phone_number).id;
				const user = new User({
					...userData,
					phoneNumber: req.body.phoneNumber,
					phoneNumberID,
				});
				user.save((err, newuser) => {
					// console.log("_______err,newuser____________", err, newuser);
					if (err) {
						return res.status(400).json({
							stat: "error",
							message: err._message,
						});
					} else {
						if (newuser) {
							newuser.setPassword(req.body.password);
							return res.json({
								stat: "success",
								user,
								message: "User created succesfully.",
							});
						} else {
							return res.status(500).json({
								stat: "error",
								message: "something went wrong, please try again",
							});
						}
					}
				});
			} else
				return res.status(404).json({
					stat: "error",
					message: "Business account with provided details, does not exist",
				});
		})
		.catch((err) => console.log(err));
};
