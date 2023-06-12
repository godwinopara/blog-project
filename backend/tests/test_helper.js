const Blog = require("../model/blog");
const User = require("../model/user");

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

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
