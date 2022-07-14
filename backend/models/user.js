const mongoose = require("mongoose");
const crypto = require("crypto");

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
		required: true,
		unique: true,
	},
	phoneNumberID: {
		type: String,
		default: "",
	},
	businessProfile: {
		type: mongoose.Schema.Types.Mixed,
	},
	hash: {
		type: String,
		default: "",
	},
	salt: {
		type: String,
		default: "",
	},
});
UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};
UserSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
	return this.hash === hash;
};
module.exports = mongoose.model("User", UserSchema);
