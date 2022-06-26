const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");

var app = express();

app.use(express.static(__dirname));
require("dotenv").config();
// console.log(process.env.MONGOURI);
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGOURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected");
	} catch (err) {
		console.error(err.message);
		// exit process with failure
		process.exit(1);
	}
};
connectDB();

app.use(cors());
app.use(bodyParser.json());
// routes middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 3000;
const start = async () => {
	try {
		await connectDB(process.env.MONGOURI);
		app.listen(port, () => console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
