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
				user.setPassword(req.body.password);
				user.save((err, newuser) => {
					// console.log("_______err,newuser____________", err, newuser);
					if (err) {
						return res.status(400).json({
							stat: "error",
							message: err._message,
						});
					} else {
						if (newuser) {
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

exports.signIn = async (req, res) => {
	const user = await User.findOne({ wabaId: req.body.phoneNumber });
	if (!user) {
		return res.status(404).json({
			stat: "error",
			msg: "User does not exist",
		});
	}
	console.log("LOG: ", user);
	if (!user.validPassword(req.body.password)) {
		return res.status(400).json({
			stat: "error",
			msg: "Wrong Password",
		});
	}
	const userData = {
		phoneNumberID: user.phoneNumberID,
		accessToken: user.accessToken,
	};
	// verifying whether registered user has valid business profile.
	await axios
		.get(`${process.env.WABAPI}/${userData.phoneNumberID}`, {
			headers: {
				Accept: "*/*",
				Authorization: `Bearer ${userData.accessToken}`,
			},
		})
		.then((wares) => {
			if (wares.status != 200) {
				return res.status(wares.status).json({
					stat: "error",
					message: wares.statusText,
				});
			}
			req.session.phoneNumberID = userData.phoneNumberID;
			req.session.accessToken = userData.accessToken;
			/*
			setting up data inside our session,
			at this point, cookie will get set in the browser.
			*/
			return res.json({
				stat: "success",
				msg: "User logged in",
				data: {
					accessToken: userData.accessToken,
					phoneNumberID: userData.phoneNumberID,
				},
			});
		});
};

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(400).json({
				stat: "error",
				msg: "Unable to logout, please try again.",
			});
		}
		res.clearCookie(process.env?.SESS_NAME);
		if (req.session) console.log(req.session);
		return res.json({
			stat: "success",
			msg: "User logged out successfully",
		});
	});
};

exports.isAuthenticated = (req, res) => {
	if (req.session.phoneNumberID && req.session.accessToken) {
		return res.json({
			isAuth: true,
			accessToken: req.session.accessToken,
			phoneNumberID: req.session.phoneNumberID,
		});
	} else {
		return res.json({
			isAuth: false,
		});
	}
};
