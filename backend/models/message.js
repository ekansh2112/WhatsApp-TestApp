const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	// message: {
	// 	type: String,
	// 	required: true
	// },
	//REVIEW -> for now working on text message only.
	messageType: {
		type: String //image/text/audio/video/doc
	},
	sender: String,
	receiver: String,
	status: {
		type: Boolean,
		default: false
	},
	message: {
		type: mongoose.Schema.Types.Mixed
	},
	timeStamp: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("Message", messageSchema);
