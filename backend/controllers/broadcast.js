const BroadcastList = require("../models/broadcast-list");
const axios = require("axios").default;

const sendAnyMessage = async (req, messageBody, next) => {
	await axios
		.post(`${process.env.WABAPI}/${req.session.phoneNumberID}/messages`, messageBody, {
			headers: {
				Authorization: "Bearer " + req.session.accessToken,
			},
		})
		.then((res) => {
			next(res);
		});
};
exports.sendBroadCast = async (req, res) => {
	const broadcastList = await BroadcastList.find({ user_wabaID: req.session.wabaID, title: req.body.title });
	if (broadcastList && broadcastList.length > 0) {
		const contactNumbers = broadcastList[0].recipients;
		let count = contactNumbers.length;
		for (let i = 0; i < count; i++) {
			try {
				let msgbody = {
					messaging_product: "whatsapp",
					to: contactNumbers[i].phoneNumber,
					type: "text",
					text: {
						preview_url: "false",
						body: req.body.message,
					},
				};
				try {
					await sendAnyMessage(req, msgbody, (wares) => {
						return res.status(200).json({
							stat: "success",
							broadcastList: broadcastList[0],
						});
					});
				} catch (e) {}
			} catch (e) {
				return res.status(500).json({
					stat: "error",
					message: "something went wrong",
				});
			}
		}
	} else {
		return res.status(404).json({
			stat: "error",
			message: "broadcast list not found",
		});
	}
};
