const blogRouter = require("express").Router();
const Blog = require("../model/blog");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("express-async-errors");

// GET ALL BLOG POSTS
// .populate("user", { username: 1, name: 1 });
blogRouter.get("/", async (req, res) => {
	const blogs = await Blog.find({});
	res.json(blogs);
});

// GET SINGLE BLOG POST

blogRouter.get("/:id", async (request, response, next) => {
	const id = request.params.id;
	const blog = await Blog.findById(id);
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).send("Invalid Id");
	}
});

// DELETE BLOG POST

blogRouter.delete("/:id", async (req, res, next) => {
	const blogId = req.params.id;

	// We need to verify if the user has permission to update the blog
	// a middleware function was created on utils/middleware.js that
	// verifies the user with jwt
	const user = req.user;

	//Only user who created a blog can delete so we need to verify if the
	// user actually created the blog

	const verifyUserCreatedBlog = user.blogs.find((blog) => blog.toString() === blogId);

	if (verifyUserCreatedBlog) {
		const blogToDelete = await Blog.findByIdAndDelete(blogId);
		res.status(204).json(blogToDelete);
	} else {
		res.status(401).json({ error: "You can only delete a blog you created" });
	}
});

// UPDATE BLOG POST

blogRouter.put("/:id", async (req, res, next) => {
	const blogId = req.params.id;
	const body = req.body;

	// We need to verify if the user has permission to update the blog
	// a middleware function was created on utils/middleware.js that
	// verifies the user with jwt
	const user = req.user;

	if (user) {
		console.log(typeof blogId);
		const blog = await Blog.findByIdAndUpdate(blogId, body);

		res.status(200).json(blog);
	} else {
		res.status(401).json({ error: "unauthorized" });
	}
});

// ADD BLOG POST

blogRouter.post("/", async (req, res) => {
	const body = req.body;

	// We need to verify if the user has permission (i.e logged in)
	// to add a new bloga middleware function was created on
	// utils/middleware.js that verifies the user with jwt

	const user = req.user;

	if (user) {
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0,
			user: user.id,
		});

		const newBlog = await blog.save();

		user.blogs = user.blogs.concat(newBlog._id);
		await user.save();

		res.status(201).json(newBlog);
	} else {
		res.status(403).send("Unauthorized");
	}
});

module.exports = blogRouter;
