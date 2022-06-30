const mongoose = require("mongoose");

const app = require("./app");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGOURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("MongoDB Connected");
	} catch (err) {
		console.error(err.message);
		// exit process with failure
		process.exit(1);
	}
};

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
