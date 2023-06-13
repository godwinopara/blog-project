const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const User = require("../model/user");
const helper = require("../tests/test_helper");

const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash("godon2009", 10);
	const user = new User({ username: "root", name: "root user", passwordHash });

	await user.save();
}, 10000);

describe("when there is initially one user in the DB", () => {
	test("should succeed with a fresh username", async () => {
		const userAtStart = await helper.usersInDb();

		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "salainen",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const users = await helper.usersInDb();
		console.log("================");
		console.log(users);
		expect(users).toHaveLength(userAtStart.length + 1);

		const usernames = users.map((user) => user.username);
		expect(usernames).toContain(newUser.username);
	}, 10000);

	test("should creation fails with proper statusCode and message if username already taken", async () => {
		const userAtStart = await helper.usersInDb();
		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "salainen",
		};

		const result = await api.post("/api/users").send(newUser).expect(400);

		expect(request.body).toContain("expected `username` to be unique");

		const users = await helper.usersInDb();
		expect(users).toHaveLength(userAtStart.length);
	}, 10000);
});
