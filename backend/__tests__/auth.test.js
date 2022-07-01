const request = require("supertest");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

describe("Authentication API", () => {
	beforeAll(async () => {
		const mongoserver = await MongoMemoryServer.create();
		await mongoose.connect(mongoserver.getUri());
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	describe("REGISTRATION", () => {
		describe("Wrong input", () => {
			it("when provided wrong waba id", async () => {
				await request(app)
					.post("/api/signup/")
					.send({
						wabaID: "102699879238080",
						accessToken: process.env.TEST_TOKEN,
						phoneNumber: "15550843602",
						password: "testing123"
					})
					.set("Accept", "*/*")
					.expect("Content-Type", "application/json; charset=utf-8")
					.expect(400);
			});

			it("when provided wrong access token -> unauthorized", async () => {
				await request(app)
					.post("/api/signup/")
					.send({
						wabaID: "101699879238080",
						accessToken: process.env.TEST_TOKEN_WRONG,
						phoneNumber: "15550843602",
						password: "testing123"
					})
					.set("Accept", "*/*")
					.expect("Content-Type", "application/json; charset=utf-8")
					.expect(401);
			});

			it("when provided wrong phone number", async () => {
				await request(app)
					.post("/api/signup/")
					.send({
						wabaID: "101699879238080",
						accessToken: process.env.TEST_TOKEN,
						phoneNumber: "15550843600",
						password: "testing123"
					})
					.set("Accept", "*/*")
					.expect("Content-Type", "application/json; charset=utf-8")
					.expect(404);
			});
		});

		describe("Register new user", () => {
			it("POST create new user", async () => {
				await request(app)
					.post("/api/signup/")
					.send({
						wabaID: "101699879238080",
						accessToken: process.env.TEST_TOKEN,
						phoneNumber: "15550843602",
						password: "testing123"
					})
					.set("Accept", "*/*")
					.expect("Content-Type", "application/json; charset=utf-8")
					.expect(200);
			});
			describe("User already exists", () => {
				it("POST create new user (User already exists)", async () => {
					await request(app)
						.post("/api/signup/")
						.send({
							wabaID: "101699879238080",
							accessToken: process.env.TEST_TOKEN,
							phoneNumber: "15550843602",
							password: "testing123"
						})
						.set("Accept", "*/*")
						.expect("Content-Type", "application/json; charset=utf-8")
						.expect(409);
				});
			});
		});
		//TODO: email and password validation tests pending
	});

	describe("LOGIN", () => {
		describe("Wrong details", () => {
			it("POST -> wrong phone number", async () => {
				await request(app)
					.post("/api/login/")
					.send({
						phoneNumber: "15551843602",
						password: "testing123"
					})
					.set("Accept", "*/*")
					.expect("Content-Type", "application/json; charset=utf-8")
					.expect(404);
			});
			it("POST -> wrong password", async () => {
				await request(app)
					.post("/api/login/")
					.send({
						phoneNumber: "15550843602",
						password: "testing13"
					})
					.set("Accept", "*/*")
					.expect("Content-Type", "application/json; charset=utf-8")
					.expect(400);
			});
		});

		describe("Successful login", () => {
			it("POST -> correct credentials", async () => {
				await request(app)
					.post("/api/login/")
					.send({
						phoneNumber: "15550843602",
						password: "testing123"
					})
					.set("Accept", "*/*")
					.expect("Content-Type", "application/json; charset=utf-8")
					.expect(200);
			});
			//FIXME: session code testing not working
			// it("GET -> check auth", async () => {
			// 	const response = await request(app).get("/api/isauth/").expect("Content-Type", "application/json; charset=utf-8");
			// 	expect(response.statusCode).toBe(200);
			// 	expect(response.body.isAuth).toEqual(true);
			// 	expect(response.body.phoneNumberID).not.toBe(undefined);
			// });
		});

		describe("Check auth and logout", () => {
			it("POST -> logout", async () => {
				await request(app).post("/api/logout/").expect(200);
			});
			it("GET -> check auth", async () => {
				const response = await request(app).get("/api/isauth/").expect("Content-Type", "application/json; charset=utf-8");
				expect(response.statusCode).toBe(200);
				expect(response.body.isAuth).toEqual(false);
				expect(response.body.phoneNumberID).toBe(undefined);
			});
		});
	});
});
