const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
	user_wabaID: {
		type: String,
		trim: true,
		required: true,
	},
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		default: "",
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
	},
	image: {
		type: String,
		default: "",
	},
	email: {
		type: String,
		default: "",
	},
	address: {
		type: String,
		default: "",
	},
});
module.exports = mongoose.model("Contact", ContactSchema);
