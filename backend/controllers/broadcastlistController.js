const { db } = require("../models/broadcast-list");
const BroadcastList = require("../models/broadcast-list");
const user_wabaID = "107654008661174"; //GET THE WABA ID of Business User

// GET ../api/broadcast/all
exports.braodcast_list = async (req, res) => {
	if (!req.session?.wabaID) {
		return res.status(401).json({
			stat: "error",
			message: "Unauthorized"
		});
	}
	console.log(req.session.wabaID);
	try {
		const broadcast_lists = await BroadcastList.find({ user_wabaID: req.session.wabaID });
		console.log(broadcast_lists);
		res.send(broadcast_lists);
	} catch (error) {
		res.status(500).json({
			stat: "error",
			message: error
		});
	}
};

// POST ../api/broadcast/create
exports.create_broadcast = async (req, res) => {
	const title = req.body.title;
	try {
		const check = await BroadcastList.find({ user_wabaID: req.session.wabaID, title: title }).count();
		if (check == 0) {
			if (req.body.recipients.length < 2) {
				return res.json({
					stat: "error",
					message: "Add atleast 2 contacts to create the list"
				});
			} else {
				const braodcast_list = new BroadcastList({
					user_wabaID: req.session.wabaID,
					title: req.body.title,
					recipients: req.body.recipients
				});

				try {
					const check2 = await braodcast_list.save();
					console.log(check2);
					return res.json({
						stat: "success",
						message: "created list successfully"
					});
				} catch (error) {
					return res.status(500).json({
						stat: "error",
						message: error
					});
				}
			}
		} else {
			return res.json({
				stat: "error",
				message: "Broadcast List with title " + title + " already exists."
			});
		}
	} catch (error) {
		return res.json({
			stat: "error",
			message: error
		});
	}
};

// PUT ../api/broadcast/update/:id -- Here :id is name of Broadcast List
exports.update_broadcast = async (req, res) => {
	return res.json({
		stat: "IN PROGRESS",
		message: "This is Incomplete, From : PUT - UPDATE BROADCAST LIST"
	});
};

// DELETE ../api/broadcast/delete/:id -- Here :id is name of Broadcast List
exports.delete_broadcast_list = async (req, res) => {
	try {
		const title = req.params.id;
		const broadcast_list = await BroadcastList.deleteOne({ user_wabaID: req.session.wabaID, title: title });
		// console.log(broadcast_list)
		if (broadcast_list.acknowledged == true && broadcast_list.deletedCount == 1)
			return res.json({
				stat: "success",
				message: title + " is deleted from broadcast List"
			});
		else {
			return res.json({
				sta: "success",
				message: title + " does not exist in your broadcast lists"
			});
		}
	} catch (err) {
		return res.status(500).json({
			stat: "error",
			message: err
		});
	}
};

// GET ../api/broadcast/:id  -- Here :id is name of Broadcast List
exports.search_broadcast_list = async (req, res) => {
	const title = req.params.id;
	try {
		const braodcast_list = await BroadcastList.findOne({
			user_wabaID: req.session.wabaID,
			title: title
		});
		if (!braodcast_list) {
			res.status(404).json({
				stat: "error",
				message: title + " doesn't exist in your broadcast lists. Please check the spelling and try again"
			});
		}

		console.log(braodcast_list);
		res.send(braodcast_list);
	} catch (error) {
		res.status(500).json({
			stat: "error",
			message: error
		});
	}
};
