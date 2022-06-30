const request = require("supertest");
const app = require("../app");

describe("Authentication API", () => {
	it("User already exists", (done) => {
		request(app)
			.post("/api/signup/")
			.send({
				wabaID: "101699879238080",
				accessToken:
					"EAAd1IET54WABAJwu46WEzKxhzoFEubNKiqJUjenPUHRvfJNvxRwFbGBeEYVRkmcHUZC3HHwZCKpzzqjyurOmy6ZBHNlRzvqUbftkXMU4e9RT1ji3nsBKLZBhxDoOP4kj6GK3IvGjtlJZCaL5R9d1tfAqugRMa4rLIdrij6E5DkLMSSsCV0ag1QFr9TH0bhzUVNKhXAcvBmKS6Bn0Ys9vk",
				phoneNumber: "5550843602",
				password: "testing123"
			})
			.set("Accept", "*/*")
			.expect("Content-Type", "/json/")
			.expect(409)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
	it("registered phones numbers", () => {});

	it("business profile", () => {});

	it("create new user", () => {});
});
