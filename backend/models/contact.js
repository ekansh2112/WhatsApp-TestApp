const mongoose = require('mongoose');
var mongooseIntlPhoneNumber = require('mongoose-intl-phone-number');

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
		default : "",
	},

	
	phoneNumber: {
		type: String,
		required: true
		// required: [true, "Phone number is required !"],
		// validate: {
		// validator: (v) => {
		// return v.length == 10;
		// },
		// message: (props) => props.value + " Must be 10 digits !",
		// },
    },


	dob:{
		type: Date,
	},


	image : {
		type: String,
		default : ""
	},


    email:{
        type: String,
		default: "",
    },


	address:{
		type: String,
		default : "",
    }
});



module.exports = mongoose.model('Contact', ContactSchema);