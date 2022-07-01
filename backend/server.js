const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const contactRoutes = require('./routes/contacts')
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cookieParser = require("cookie-parser");

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
// connectDB();

const {
	COOKIE_EXPIRY = 1000 * 60 * 60 * 24,
	SESS_NAME = "wab_sid",
	SECRET = "SomeSuperLongHardToGuessSecretString", //TODO: update secret
	MODE = "DEVELOPMENT",
} = process.env;

app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
		credentials: true,
	})
);
app.use(bodyParser.json());

app.use(
	session({
		name: SESS_NAME,
		secret: SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGOURI,
			collection: "sessions",
			ttl: parseInt(COOKIE_EXPIRY),
			autoRemove: "interval",
			autoRemoveInterval: 60, //expired sessions will get deleted every 1 hr.
			crypto: {
				secret: SECRET, //encrypting session in mongodb
			},
		}),
		cookie: { maxAge: parseInt(COOKIE_EXPIRY), secure: MODE == "PRODUCTION" ? true : false },
	})
);

// routes middleware
app.use("/api", authRoutes);
app.use('/api/contacts',contactRoutes)


const port = process.env.PORT || 3000;
const start = async () => {
	try {
		await connectDB(process.env.MONGOURI);
		app.listen(port, () => console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
