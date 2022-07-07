const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const broadcastListSchema = new Schema({
	user_wabaID: {
		type: String,
		trim: true,
		required: true,
	},

    title:{
        type: String,
        required: true,
    },

    recipients:{
        type: Array,
        required: true,
    }

});

module.exports = mongoose.model('BroadcastList', broadcastListSchema);