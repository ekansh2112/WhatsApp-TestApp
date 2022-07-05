const Message = require("../models/message");
const axios = require("axios").default;

const sendTextMessage = async (message, next) => {
	const { messageBody, contactNumber, messageType } = message;
	await axios
		.post(`${process.env.WABAPI}/${req.session.phoneNumberID}/messages`, {
			headers: {
				Authorization: `Bearer ${req.session.accessToken}`,
				Accept: "*/*",
				"Content-Type": "application/json; charset=utf-8"
			},
			body: {
				messaging_product: "whatsapp",
				type: messageType,
				to: contactNumber,
				text: {
					preview_url: true,
					body: messageBody
				}
			}
		})
		.then((res) => {
			console.log(res);
			next(res);
		});
};
exports.sendMessage = async (req, res) => {
	//CHECK USER AUTHENTICATION
	if (!req.session.phoneNumberID || !req.session.wabaID) {
		return res.status(401).json({
			stat: "error",
			message: "User unauthorized."
		});
	}
	/*
        user_wabaID -> get from session
        req.body -> 
        contactNumber,
        messageBody,
        messageType,(text/image/doc/audio/video)
    */

	const { messageBody, contactNumber, messageType } = req.body;
	const message = new Message({
		message: messageBody,
		messageType,
		sender: req.session.wabaID,
		receiver: contactNumber
	});

	//STORE THIS OBJECT IN DB (message status -> false (i.e pending)
	message.save((err, newMessage) => {
		if (err) {
			return res.status(400).json({
				stat: "error",
				message: err._message
			});
		} else {
			if (newMessage) {
				return res.json({
					stat: "success",
					messageData: message
				});
			} else {
				return res.status(500).json({
					stat: "error",
					message: "something went wrong, please try again"
				});
			}
		}
	});

	// WA API CALL TO SEND MESSAGE
	try {
		await sendTextMessage(message, (res) => {
			console.log(res);
			if (!res.status == 200) {
				return res.status(res.status).json({
					stat: "error",
					message: res.statusText
				});
			}

			const updatedMessage = Message.updateOne(
				{
					_id: message._id
				},
				{
					status: true
				}
			);

			if (updatedMessage) {
				return res.json({
					stat: "success",
					messageData: updatedMessage
				});
			} else {
				return res.json({
					stat: "error"
				});
			}
		});
	} catch (e) {
		console.log(e);
	}

	/**
	 * if response not 200 -> return error with corresponding response status code and delete entry from db
	 * else -> success -> update message status to true (sent).
	 */
	//CATCH error, if any and send response accordingly.
};

exports.getMessages = (req, res) => {
	/**
	 * req.body -> contactNumber
	 * retreive all messages with above info from db.
	 * return as json.
	 */
};

exports.deleteMessage = (req, res) => {
	/**
	 *
	 */
};
