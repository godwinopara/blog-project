const blogRouter = require("express").Router();
const Blog = require("../model/blog");

// GET ALL BLOG POSTS

blogRouter.get("/", (req, res) => {
	Blog.find({})
		.then((blogs) => {
			res.json(blogs);
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
});

// GET SINGLE BLOG POST

blogRouter.get("/:id", (req, res) => {
	const id = req.params.id;
	Blog.findById(id).then((blog) => {
		if (blog) {
			res.json(blog);
		} else {
			res.status(404).json({ error: "Not Found" });
		}
	});
});

// DELETE BLOG POST

blogRouter.delete("/:id", (req, res) => {
	const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then((blog) => {
			if (blog) {
				console.log(blog);
				res.status(204).end();
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => {
			res.status(400).json(error);
		});
});

// ADD BLOG POST

blogRouter.post("/", (req, res) => {
	const body = req.body;

	const blog = new Blog(body);

	blog.save()
		.then((savedBlog) => {
			res.status(201).json(savedBlog);
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
});

module.exports = blogRouter;