const { db } = require("../models/broadcast-list");
const BroadcastList = require("../models/broadcast-list");
const Contact = require("../models/contact");

exports.braodcast_list = async (req, res) => {
	if (!req.session?.wabaID) {
		return res.status(401).json({
			stat: "error",
			message: "Unauthorized",
		});
	}
	try {
		const broadcast_lists = await BroadcastList.find({ user_wabaID: req.session.wabaID });
		res.send(broadcast_lists);
	} catch (error) {
		res.status(500).json({
			stat: "error",
			message: error,
		});
	}
};
exports.create_broadcast = async (req, res) => {
	const title = req.body.title;
	let info = [];
	try {
		const check = await BroadcastList.find({ user_wabaID: req.session.wabaID, title: title }).count();
		if (check == 0) {
			if (req.body.recipients.length < 2) {
				return res.json({
					stat: "error",
					message: "Add atleast 2 contacts to create the list",
				});
			} else {
				for (let i = 0; i < req.body.recipients.length; i++) {
					const contact = await Contact.findOne({ phoneNumber: req.body.recipients[i] });
					info.push({
						phoneNumber: req.body.recipients[i],
						fname: contact.fname,
						lname: contact.lname,
						image: contact.image,
					});
				}
				const braodcast_list = new BroadcastList({
					user_wabaID: req.session.wabaID,
					title: req.body.title,
					recipients: info,
				});
				try {
					const check2 = await braodcast_list.save();
					return res.json({
						stat: "success",
						message: "created list successfully",
					});
				} catch (error) {
					return res.status(500).json({
						stat: "error",
						message: error,
					});
				}
			}
		} else {
			return res.json({
				stat: "error",
				message: "Broadcast List with title " + title + " already exists.",
			});
		}
	} catch (error) {
		return res.json({
			stat: "error",
			message: error,
		});
	}
};
exports.update_broadcast = async (req, res) => {
	return res.json({
		stat: "IN PROGRESS",
		message: "This is Incomplete, From : PUT - UPDATE BROADCAST LIST",
	});
};
exports.delete_broadcast_list = async (req, res) => {
	try {
		const title = req.params.id;
		const broadcast_list = await BroadcastList.deleteOne({ user_wabaID: req.session.wabaID, title: title });
		if (broadcast_list.acknowledged == true && broadcast_list.deletedCount == 1)
			return res.json({
				stat: "success",
				message: title + " is deleted from broadcast List",
			});
		else {
			return res.json({
				sta: "success",
				message: title + " does not exist in your broadcast lists",
			});
		}
	} catch (err) {
		return res.status(500).json({
			stat: "error",
			message: err,
		});
	}
};
exports.search_broadcast_list = async (req, res) => {
	const title = req.params.id;
	try {
		const braodcast_list = await BroadcastList.findOne({
			user_wabaID: req.session.wabaID,
			title: title,
		});
		if (!braodcast_list) {
			res.status(404).json({
				stat: "error",
				message: title + " doesn't exist in your broadcast lists. Please check the spelling and try again",
			});
		}
		res.send(braodcast_list);
	} catch (error) {
		res.status(500).json({
			stat: "error",
			message: error,
		});
	}
};
