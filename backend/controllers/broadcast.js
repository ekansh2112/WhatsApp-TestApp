const BroadcastList = require("../models/broadcast-list");
const axios = require("axios").default;

const sendAnyMessage = async (req, messageBody, next) => {
	console.log(req.session.accessToken, "s22");
	await axios
		.post(`${process.env.WABAPI}/${req.session.phoneNumberID}/messages`, messageBody, {
			headers: {
				Authorization: "Bearer " + req.session.accessToken,
			},
		})
		.then((res) => {
			console.log("___IN SEND ANY MESSAGE___", res);
			next(res);
		});
};

//REVIEW "ERROR CODES"
exports.sendBroadCast= async(req,res)=>{
    console.log(req.session.accessToken);
    const broadcastList=await BroadcastList.find({ user_wabaID: "107654008661174", title: req.body.title });
    console.log(broadcastList);
    if (broadcastList) {
		const contactNumbers = broadcastList[0].recipients;
		let count = contactNumbers.length;
		for (let i = 0; i < count; i++) {
			try {
				let msgbody = {
					messaging_product: "whatsapp",
					to: contactNumbers[i],
					type: "text",
					text: {
						preview_url: "false",
						body: req.body.message,
					},
				};
				try {
					await sendAnyMessage(req, msgbody, (wares) => {
						if (wares.status !== 200) {
							return res.status(500).json({
								stat: "error",
								message: "something went 123wrong",
							});
						}
						return res.status(200).json({
							stat: "success",
						});
					});
				} catch (e) {
					return res.status(500).json({
						stat: "error",
						message: "something went111 wrong",
					});
				}
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
}