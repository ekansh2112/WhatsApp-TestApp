const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SentMessageStatusSchema = new Schema({
	user_wabaID:{
		type : String
	},
	// message_from:{
	// 	profile :{
	// 		name: String
	// 	},
	// 	phoneNumber: String
	// },

	statuses: {
		type: mongoose.Schema.Types.Mixed
	},


})

module.exports  = mongoose.model('SentMessageStatus', SentMessageStatusSchema)