const blogRouter = require("express").Router();
const Blog = require("../model/blog");

// GET ALL BLOG POSTS

blogRouter.get("/", async (req, res) => {
	const blogs = await Blog.find({});
	res.json(blogs);
});

// GET SINGLE BLOG POST

blogRouter.get("/:id", async (req, res, next) => {
	const id = req.params.id;
	const blog = await Blog.findById(id);
	if (blog) {
		res.json(blog);
	} else {
		res.status(404).end();
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
	body.likes === undefined ? (body.likes = 0) : body.likes;

	const blog = new Blog(body);
	const newBlog = await blog.save();

	res.status(201).json(newBlog);
});

module.exports = blogRouter;
