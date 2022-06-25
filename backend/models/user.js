const mongoose = require("mongoose");
const crypto = require("crypto");

const businessProfileSchema = new mongoose.Schema({
	address: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "",
	},
	vertical: {
		//business industry
		type: String,
		default: "",
	},
	websites: {
		type: Array,
		default: [],
	},
	email: {
		//TODO: add email validator
		type: String,
	},
});
const UserSchema = new mongoose.Schema({
	wabaID: {
		type: String,
		trim: true,
		required: true,
	},
	accessToken: {
		type: String,
		trim: true,
		required: true,
	},
	phoneNumber: {
		type: String,
		//TODO: add phone number validator
		required: true,
	},
	phoneNumberID: String,
	businessProfile: {
		type: businessProfileSchema,
		default: {},
	},
	hash: String,
	salt: String,
});

// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function (password) {
	// Creating a unique salt for a particular user
	this.salt = crypto.randomBytes(16).toString("hex");

	// Hashing user's salt and password with 1000 iterations,

	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
	return this.hash === hash;
};

// Exporting module to allow it to be imported in other files
module.exports = mongoose.model("User", UserSchema);
