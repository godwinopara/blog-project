const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");

userRouter.get("/", async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

userRouter.post("/", async (request, response) => {
	const { username, name, password, userId } = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const newUser = User({ username, name, passwordHash });

	const savedUser = newUser.save();

	response.status(201).json(savedUser);
});

module.exports = userRouter;
