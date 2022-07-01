const mongoose = require('mongoose');
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
		required: true,
	},
	phoneNumber: {
		type: String,
        required: true,
    },
    email:{
        type: String,
		default: "",
    },
	address:{
		// type: String,
        DoorNumber: String,
        street: String,
        city: String,
        state: String,
        zip: Number,
        default: "",
    }
});


module.exports = mongoose.model('Contact', ContactSchema);