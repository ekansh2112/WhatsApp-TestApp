const Message = require("../models/message");
const axios = require("axios").default;
const formidable = require("formidable");
const fs = require("fs");
const crypto = require("crypto");

//ANCHOR - WA API call to send message to a contact number.
const sendAnyMessage = async (req, messageBody, next) => {
	await axios
		.post(`${process.env.WABAPI}/${req.session.phoneNumberID}/messages`, messageBody, {
			headers: {
				Authorization: "Bearer " + req.session.accessToken
			}
		})
		.then((res) => {
			console.log("___IN SEND ANY MESSAGE___", res);
			next(res);
		});
};

//ANCHOR - WA API call to upload file on fb server.
const uploadMedia = async (req, file, type, next) => {
	console.log("in upload media", file);
	await axios
		.post(
			`${process.env.WABAPI}/${req.session.phoneNumberID}/media`,
			{
				messaging_product: "whatsapp",
				file,
				type
			},
			{
				headers: {
					Authorization: "Bearer " + req.session.accessToken,
					"Content-Type": "multipart/form-data"
				}
			}
		)
		.then((res) => {
			next(true, res);
		})
		.catch((err) => {
			console.log("____ ERROR IN UPLOAD MEDIA____");
			console.log(err);
			next(false);
		});
};

//ANCHOR - storing messages in DB after encrypting them.

const decryptMessage = (message, next) => {
	console.log("here in decr", message.salt);
	// initVector = message.salt.split("-")[0];
	// securityKey = message.salt.split("-")[1]
	initVector = Buffer.from(message.salt.vectoriv, "hex");
	securityKey = Buffer.from(message.salt.vectorkey, "hex");
	const decipher = crypto.createDecipheriv(process.env.ALGORITHM, securityKey, initVector);
	let decryptedData = decipher.update(message.message, "hex", "utf-8");
	console.log("here ", initVector, securityKey);
	decryptedData += decipher.final("utf8");
	console.log("DECRYPTED DATA", decryptedData);
	next(decryptedData);
};
const storeMessage = async (req, payload, wares, next) => {
	console.log("in store");
	if (wares.status != 200) {
		console.log("not 200");
		next(false, wares.status);
	} else {
		console.log("yes 200");
		const messageData = {
			message: payload.messagePayload,
			messageType: payload.messageType,
			sender: req.session.phoneNumberID,
			receiver: payload.contactNumber
		};
		const initVector = crypto.randomBytes(16);
		const securityKey = crypto.randomBytes(32);
		const count = await Message.find({
			user_wabaID: req.session.wabaID,
			phoneNumber: payload.contactNumber
		}).count();
		console.log("COUNNNNNNNT", count);
		try {
			const cipher = crypto.createCipheriv(process.env.ALGORITHM, securityKey, initVector);
			console.log("in try");
			let encryptedData = cipher.update(JSON.stringify(messageData), "utf-8", "hex");
			encryptedData += cipher.final("hex");
			const message = new Message({
				user_wabaID: req.session.wabaID,
				phoneNumber: payload.contactNumber,
				message_data: encryptedData,
				sent_or_received: "sent",
				// salt: initVector.toString("hex") + "-" + securityKey.toString("hex")
				salt: {
					vectoriv: initVector.toString("hex"),
					vectorkey: securityKey.toString("hex")
				},
				count: count
			});
			//STORE THIS OBJECT IN DB
			console.log("EEEEEEEE", encryptedData);
			message.save(async (err, newMessage) => {
				if (err) {
					console.log("err in msg save");
					next(false, 400);
				} else {
					if (newMessage) {
						console.log("NEWMESSAGE", newMessage);
						try {
							decryptMessage({ message: encryptedData, salt: newMessage.salt }, (mydata) => {
								next(true, 200, JSON.parse(mydata));
							});
						} catch (e) {
							next(false, 500);
						}
					} else {
						console.log("no new message");
						next(false, 500);
					}
				}
			});
		} catch (e) {
			next(false, 500);
		}
	}
};

// ANCHOR - form parser for multipart data
const parseForm = (req, next) => {
	var form = formidable({
		keepExtensions: true,
		uploadDir: __dirname + "/assets/",
		allowEmptyFiles: false
	});
	form.on("file", (field, file) => {
		form.filename = () => {
			return file.originalFilename;
		};
		// fs.rename(form.uploadDir + "/" + file.newFilename, form.uploadDir + "/" + file.originalFilename, (err) => {});
	});
	form.parse(req, (err, fields, files) => {
		if (err) {
			next(false);
			return;
		} else {
			console.log("FORM.PARSE", files);
			try {
				const file = fs.createReadStream(files?.file?.filepath);
				// if (!file) console.log("_______");
				// console.log("PARSE FORM __ ", fields, file);
				next(true, {
					fields,
					file: {
						file,
						name: files?.file?.originalFilename,
						type: files?.file?.mimetype || ""
					}
				});
			} catch (e) {
				next(false);
			}
		}
	});
};

//ANCHOR - API wrapper for sending template message.
exports.sendTemplate = async (req, phoneNumber, next) => {
	let msgbody = {
		messaging_product: "whatsapp",
		to: phoneNumber,
		type: "template",
		template: {
			name: "message",
			language: { code: "en_US" }
		}
	};

	try {
		// WA API CALL TO SEND MESSAGE
		await sendAnyMessage(req, msgbody, (wares) => {
			next(wares);
		});
	} catch (e) {
		//CATCH error, if any and send response accordingly.
		console.log(e);
	}
};

//ANCHOR - API wrapper for sending text message.
exports.sendMessage = async (req, res) => {
	//CHECK USER AUTHENTICATION
	if (!req.session.phoneNumberID || !req.session.wabaID) {
		return res.status(401).json({
			stat: "error",
			message: "User unauthorized."
		});
	}

	let messageBody = {
		messaging_product: "whatsapp",
		recipient_type: "individual",
		to: req.body.contactNumber,
		messageType: req.body.messageType,
		text: req.body.messagePayload.text
	};
	// console.log(messageBody);
	try {
		// WA API CALL TO SEND MESSAGE
		await sendAnyMessage(req, messageBody, (wares) => {
			// console.log("SEND TEXT MESSAGE RES", wares.status, wares.statusText);
			storeMessage(
				req,
				{
					messagePayload: req.body.messagePayload,
					messageType: req.body.messageType,
					contactNumber: req.body.contactNumber
				},
				wares,
				(status, statusCode, resData) => {
					if (!status) {
						return res.status(statusCode).json({
							stat: "error",
							message: "Something went wrong!"
						});
					} else {
						return res.json({
							stat: "success",
							message: resData
						});
					}
				}
			);
		});
	} catch (e) {
		//CATCH error, if any and send response accordingly.
		// console.log(e);
		return res.status(e?.response?.status || 500).json({
			stat: "error",
			message: e?.response?.statusText || "Something went wrong."
		});
	}
};

const fileData = (req, res) => {};

//ANCHOR -  API wrapper for sending file message.
exports.sendFileMessage = async (req, res) => {
	//CHECK USER AUTHENTICATION
	if (!req.session.phoneNumberID || !req.session.wabaID) {
		return res.status(401).json({
			stat: "error",
			message: "User unauthorized."
		});
	}
	parseForm(req, async (status, data) => {
		// console.log("_____________________________________--", data);
		if (!status)
			return res.status(400).json({
				stat: "error",
				message: "File error."
			});
		else {
			// console.log(data);
			let messageBody = {
				messaging_product: "whatsapp",
				recipient_type: "individual",
				to: data.fields.contactNumber,
				type: data.fields.messageType
			};

			console.log("HELLO");

			await uploadMedia(req, data.file.file, data.file?.type, async (status, wares) => {
				// console.log("-------------------------", wares.status);
				if (!status || !wares || wares.status != 200) {
					return res.status((wares && wares.status) || 500).json({
						stat: "error",
						message: (wares && wares.statusText) || "Something went wrong!"
					});
				}
				// console.log("AFTER UPLOAD MEDIA", wares.data);
				fileData(wares.data.id, () => {});
				if (messageBody.type === "image")
					messageBody = {
						...messageBody,
						image: {
							id: wares.data.id
						}
					};
				else
					messageBody = {
						...messageBody,
						document: {
							filename: data.file?.name || "document",
							caption: data.fields?.caption || "",
							id: wares.data.id
						}
					};
				console.log("BEFORE SEND ANY MESSAGE", messageBody);
				await sendAnyMessage(req, messageBody, (wares) => {
					storeMessage(
						req,
						{
							messagePayload: messageBody, //REVIEW
							contactNumber: data.fields.contactNumber,
							messageType: data.fields.messageType
						},
						wares,
						(status, statusCode, resData) => {
							// console.log(resData);
							if (!status) {
								return res.status(statusCode).json({
									stat: "error",
									message: "Something went wrong!"
								});
							} else {
								return res.json({
									stat: "success",
									message: resData
								});
							}
						}
					);
				});
			}).catch((err) => {
				console.log(err);
				return res.status(500).json({
					stat: "error",
					message: "something went wrong."
				});
			});
		}
	});
};

//ANCHOR get message
exports.getMessages = async (req, res) => {
	/*
	 * Sent Messages,
	 * Receive Messages
	 * API CALL: GET .../api/messages/<Phone-Number>
	 */

	const phoneNumber = req.params.id;
	try {
		const messages = await Message.find({ user_wabaID: req.session.wabaID, phoneNumber: phoneNumber }).sort({ timeStamp: "-1" });
		let arr = [];
		// console.log(messages.length);
		messages.map((msg) => {
			console.log("IN DECRYPT", msg.salt);
			const date = new Date(msg.timeStamp);
			const totaltime = date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
			decryptMessage({ message: msg.message_data, salt: msg?.salt }, (myres) => {
				const dres = JSON.parse(myres);
				if (msg.sent_or_received == "received") {
					if (dres.type == "image") {
						arr.push({
							message: {
								image: dres.image
							},
							messageType: dres.type,
							time: totaltime,
							count: msg.count,
							type: "received"
						});
					} else if (dres.type == "document") {
						arr.push({
							message: {
								document: dres.document
							},
							messageType: dres.type,
							time: totaltime,
							count: msg.count,
							type: "received"
						});
					} else if (dres.type == "text") {
						arr.push({
							message: {
								text: dres.text
							},
							messageType: dres.type,
							time: totaltime,
							count: msg.count,
							type: "received"
						});
					}
				} else {
					arr.push({
						message: dres.message,
						messageType: dres.messageType,
						time: totaltime,
						count: msg.count,
						type: "sent"
					});
				}
			});
		});
		arr.sort((a, b) => {
			return a.count - b.count;
		});
		return res.json({
			stat: "success",
			messages: arr
		});
	} catch (err) {
		res.json({
			stat: "error",
			message: err
		});
	}
};
exports.deleteMessage = (req, res) => {
	/**
	 *
	 */
};
