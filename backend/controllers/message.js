const Message = require("../models/message");
const axios = require("axios").default;
const formidable = require("formidable");
const fs = require("fs");

const sendAnyMessage = async (req, messageBody, next) => {
	console.log(req.session.accessToken,"s22");
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

const uploadMedia = async (req, file, next) => {
	console.log("in upload media", req.session.phoneNumberID);
	await axios
		.post(
			`${process.env.WABAPI}/${req.session.phoneNumberID}/media`,
			{
				messaging_product: "whatsapp",
				file,
				type: "image/jpeg"
			},
			{
				headers: {
					Authorization: "Bearer " + req.session.accessToken,
					"Content-Type": "multipart/form-data"
				}
			}
		)
		.then((res) => {
			console.log("____IN UPLOAD MEDIA____", res);
			next(res);
		})
		.catch((err) => {
			console.log("____ ERROR IN UPLOAD MEDIA____");
		});
};

const storeMessage = (req, payload, wares, next) => {
	if (wares.status != 200) {
		next(false, wares.status);
	} else {
		const message = new Message({
			message: payload.messagePayload,
			messageType: payload.messageType,
			sender: req.session.phoneNumberID,
			receiver: payload.contactNumber,
			status: true
		});

		//STORE THIS OBJECT IN DB
		message.save(async (err, newMessage) => {
			if (err) {
				// console.log(err);
				next(false, 400);
			} else {
				if (newMessage) {
					// console.log("NEWMESSAGE", newMessage);
					next(true, 200, newMessage);
				} else {
					next(false, 500);
				}
			}
		});
	}
};

const parseForm = (req, next) => {
	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname;
	var mypath = "";
	form.on("file", (field, file) => {
		// console.log("__________________", file);
		mypath = form.uploadDir + "\\" + file.originalFilename;
		fs.rename(form.uploadDir + "/" + file.newFilename, form.uploadDir + "/" + file.originalFilename, (err) => {
			// console.log("{}{}{}{}{}{}{}{", err);
		});
	});
	form.parse(req, (err, fields, files) => {
		if (err) {
			next(false);
			// console.log(err);
			return;
		}
		const file = fs.createReadStream(mypath);
		if (!file) console.log("_______");
		// console.log("MY PATH____skjefnew_____________________", mypath, file);
		next(true, { fields, file });
	});
};

exports.sendTemplate= async(req,phoneNumber,res) =>{
	let msgbody={
		messaging_product:"whatsapp",
		to: phoneNumber,
		type:"template",
		template:{
			name:"message",
			language:{code:"en_US"}
		}
		
	}
	console.log(msgbody)
	try {
		// WA API CALL TO SEND MESSAGE
		await sendAnyMessage(req, msgbody, (wares) => {
			console.log(req.session.accessToken,"abcdef");
			console.log("SEND TEXT MESSAGE RES", wares.status, wares.statusText);
		});
	} catch (e) {
		//CATCH error, if any and send response accordingly.
		console.log(e);

	}
};

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

			await uploadMedia(req, data.file, async (wares) => {
				console.log("-------------------------", wares.status);
				if (wares.status != 200) {
					return wares.status(wares.status).json({
						stat: "error",
						message: wares.statusText
					});
				}
				console.log("AFTER UPLOAD MEDIA", wares);
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
							...data.fields.otherData,
							id: data
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
