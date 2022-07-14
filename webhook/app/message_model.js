const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	user_wabaID: {
		type: String,
	},
	phoneNumber: {
		type: String,
	},
	sent_or_received: {
		type: String,
	},
	message_data: {
		type: mongoose.Schema.Types.Mixed,
	},
	timeStamp: {
		type: Date,
		default: Date.now(),
	},
});
module.exports = mongoose.model("Message", messageSchema);
