const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const Blog = require("../model/blog");
require("express-async-errors");

userRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1, likes: 1 });
	response.json(users);
});

userRouter.post("/", async (request, response, next) => {
	const { username, name, password, userId } = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const newUser = User({ username, name, passwordHash });

	const savedUser = await newUser.save();
	response.status(201).json(savedUser);
});

userRouter.delete("/:id", async (request, response) => {
	const id = request.params.id;
	const deletedUser = await User.findByIdAndRemove(id);

	response.status(204);
});

module.exports = userRouter;
