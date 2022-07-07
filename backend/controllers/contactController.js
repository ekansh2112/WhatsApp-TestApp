const { db } = require("../models/contact");
const Contact = require("../models/contact");
const user_wabaID = "107654008661174"; //GET THE WABA ID of Business User
const { sendTemplate } = require("./message");

// GET ../api/contacts/all
exports.contact_list = async (req, res) => {
	try {
		const contacts = await Contact.find({ user_wabaID: user_wabaID });
		//FILTER CONTACTS OF INDIVIDUAL BY THEIR WABA ID
		res.send(contacts);
	} catch (err) {
		console.log(err);
		return res.json({
			stat: "error",
			message: err,
		});
	}
};

// POST ../api/contacts/create
exports.create_contact = async (req, res) => {
	const phoneNumber = "91" + req.body.phoneNumber;
	if (phoneNumber.length != 12) {
		res.json({
			stat: "error",
			message: "Invalid Mobile Number",
		});
	} else {
		try {
			const check = await Contact.find({ phoneNumber: phoneNumber, user_wabaID: user_wabaID }).count();
			if (check == 0) {
				const fname = req.body.fname;
				const lname = req.body.lname;

				const check2 = await Contact.find({ user_wabaID: user_wabaID, fname: fname, lname: lname }).count();
				if (check2 != 0) {
					res.json({
						stat: "error",
						message: "Contact already exists with name First Name as: " + fname + " and Last Name as: " + lname,
					});
				} else {
					const contact = new Contact({
						user_wabaID: user_wabaID,
						fname: req.body.fname,
						lname: req.body.lname,
						phoneNumber: phoneNumber,
						dob: req.body.dob, //Format: YYYY-MM-DD
						email: req.body.email,
						address: req.body.address,
					});

					try {
						await contact.save();
						sendTemplate(req, phoneNumber, (wares) => {
                            if(wares.status!==200)
                            {
                                return res.status(500).json({
									stat: "error",
									message: err,
								});
                            }
							return res.json({
								stat: "success",
								message: "Contact created successfully",
							});
						});
					} catch (err) {
						console.log(err);
						return res.status(500).json({
							stat: "error",
							message: err,
						});
					}
				}
			} 
            else 
            {
				return res.json({
					stat: "error",
					message: "Contact already exists with phone Number: " + phoneNumber,
				});
			}
		} catch (error) {
			//console.log(error);
			return res.json({
				stat: "error",
				message: error,
			});
		}
	}
};

// UPDATE ../api/contacts/update/:id -  - Search by Contact Number
exports.update_contact = async (req, res) => {
	const phoneNumber = "91" + req.params.id;

	try {
		const check = await Contact.find({ phoneNumber: phoneNumber, user_wabaID: user_wabaID }).count();
		if (check == 0) {
			return res.json({
				stat: "error",
				message: "Contact with phoneNumber " + phoneNumber + " doesn't exist",
			});
		} else {
			const details = {
				user_wabaID: user_wabaID, //GET THE WABA ID of Business User
				fname: req.body.fname,
				lname: req.body.lname,
				phoneNumber: phoneNumber,
				email: req.body.email,
				address: req.body.address,
			};

			try {
				const contacts = await Contact.updateOne({ user_wabaID: user_wabaID, phoneNumber: phoneNumber }, details);
				//FILTER CONTACTS OF INDIVIDUAL BY THEIR WABA ID

				if (contacts.matchedCount < 1)
					return res.json({
						stat: "error",
						message: "Contact not found",
					});
				else if (contacts.modifiedCount >= 1)
					//res.send(contacts);
					return res.json({
						stat: "success",
						message: "Contact updated successfully",
					});
				else {
					if ("91" + req.body.phoneNumber != phoneNumber)
						return res.json({
							stat: "error",
							message: "Phone Number cannot be changed",
						});
					return res.json({
						stat: "error",
						message: "All the details entered are same in the database.",
					});
				}
			} catch (err) {
				//console.log(err)
				res.status(500).send(err);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

// DELETE ../api/contacts/delete/:id - Search by Contact Number
exports.delete_contact = async (req, res) => {
	const phoneNumber = "91" + req.params.id;
	try {
		const check = await Contact.find({ user_wabaID: user_wabaID, phoneNumber: phoneNumber }).count();
		if (check == 0) {
			return res.json({
				stat: "error",
				message: phoneNumber + " doesn't exists in the contacts",
			});
		} else {
			try {
				const contacts = await Contact.deleteOne({ user_wabaID: user_wabaID, phoneNumber: phoneNumber });
				if (contacts.acknowledged == true && contacts.deletedCount == 1) {
					return res.json({
						stat: "success",
						message: phoneNumber + " is deleted from contacts successfully.",
					});
				}
			} catch (err) {
				return res.status(500).json({
					stat: "error2",
					message: err,
				});
			}
		}
	} catch (err) {
		return res.status(500).json({
			stat: "error",
			message: err,
		});
	}
};

// GET ../api/contacts/search/:id -  - Search by Contact Number
exports.search_contact = async (req, res) => {
	try {
		const phoneNumber = "91" + req.params.id;
		const contacts = await Contact.find({ user_wabaID: user_wabaID, phoneNumber: phoneNumber });
		//FILTER CONTACTS OF INDIVIDUAL BY THEIR WABA ID
		if (contacts.length == 0)
			return res.json({
				stat: "error",
				message: "Contact not found",
			});
		res.send(contacts);
	} catch (err) {
		return res.status(500).json({
			stat: "error",
			message: err,
		});
	}
};
