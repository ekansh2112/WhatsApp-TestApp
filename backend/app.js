const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contacts");
const broadcastRoutes = require("./routes/broadcast-lists");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");

var app = express();
app.use(express.static(__dirname));
require("dotenv").config();
const { COOKIE_EXPIRY = 1000 * 60 * 60 * 24, SESS_NAME = "wab_sid", SECRET = "SomeSuperLongHardToGuessSecretString", MODE = "DEVELOPMENT" } = process.env;
app.use(cookieParser());
app.use(
	cors({
		origin: `http://localhost:${process.env.CLIENT_PORT}`,
		methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
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
			autoRemoveInterval: 60,
			crypto: {
				secret: SECRET,
			},
		}),
		cookie: { maxAge: parseInt(COOKIE_EXPIRY), secure: MODE == "PRODUCTION" ? true : false },
	})
);
app.use("/api", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/broadcast", broadcastRoutes);
module.exports = app;
