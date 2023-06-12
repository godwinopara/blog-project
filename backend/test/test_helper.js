const Blog = require("../model/blog");

const initialBlogs = [
	{
		title: "Modern Javascript",
		author: "Frank Moore",
		url: "https://github.com",
		likes: 10,
	},
	{
		title: "Html is easy",
		author: "Martins kings",
		url: "https://github.com",
		likes: 5,
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
