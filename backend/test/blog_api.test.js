const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../model/blog");

const api = supertest(app);

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

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
}, 10000);

test("blog list are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect("Content-Type", /application\/json/)
		.expect(200);
}, 10000);

test("all blogs are required", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(initialBlogs.length);
}, 10000);

test("the first blog", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body[0].title).toBe("Modern Javascript");
}, 10000);

test("a specific blog is return ", async () => {
	const response = await api.get("/api/blogs");
	const contents = response.body.map((r) => r.title);
	expect(contents).toContain("Html is easy");
});

afterAll(async () => {
	await mongoose.connection.close();
});
