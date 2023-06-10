const blogRouter = require("express").Router();

// GET ALL BLOG POSTS

blogRouter.get("/", (req, res) => {
	res.send("blog");
});

// GET SINGLE BLOG POST

blogRouter.get("/:id", (req, res) => {
	const id = req.params.id;
	res.json({ id: id });
});

// DELETE BLOG POST

blogRouter.delete("/:id", (req, res) => {
	const id = req.params.id;
	res.send("blog post deleted");
});

// ADD BLOG POST

blogRouter.post("/", (req, res) => {
	const blogPost = req.body;
	res.json({
		title: blogPost.title,
		author: blogPost.author,
		url: blogPost.url,
	});
});

module.exports = blogRouter;
