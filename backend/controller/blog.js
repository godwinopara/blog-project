const blogRouter = require("express").Router();
const Blog = require("../model/blog");
const User = require("../model/user");
require("express-async-errors");

// GET ALL BLOG POSTS

blogRouter.get("/", async (req, res) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
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
	const id = req.params.id;
	await Blog.findByIdAndDelete(id);
	res.status(204).end();
});

// ADD BLOG POST

blogRouter.post("/", async (req, res) => {
	const body = req.body;

	const user = await User.findById(body.userId);

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
});

module.exports = blogRouter;
