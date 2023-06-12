const blogRouter = require("express").Router();
const Blog = require("../model/blog");

// GET ALL BLOG POSTS

blogRouter.get("/", async (req, res) => {
	const blogs = await Blog.find({});
	res.json(blogs);
});

// GET SINGLE BLOG POST

blogRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	const blog = await Blog.findById(id);
	res.json(blog);
});

// DELETE BLOG POST

blogRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	const blog = await Blog.findByIdAndDelete(id);
	res.status(204).end();
});

// ADD BLOG POST

blogRouter.post("/", async (req, res, next) => {
	const body = req.body;

	const blog = new Blog(body);

	try {
		const newBlog = await blog.save();
		res.status(201).json(newBlog);
	} catch (error) {
		next(error);
	}
});

module.exports = blogRouter;
