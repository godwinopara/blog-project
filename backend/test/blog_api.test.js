const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../model/blog");
const helper = require("../test/test_helper");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

// TEST TO CHECK IF THE API IS IN "APPLICTION/JSON FORMAT"

test("blog list are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect("Content-Type", /application\/json/)
		.expect(200);
}, 10000);

// TEST TO CHECK IF BLOG POST ARE COMPLETE

test("all blogs are required", async () => {
	const response = await api.get("/api/blogs");
	expect(response.body).toHaveLength(helper.initialBlogs.length);
}, 10000);

// TEST THAT RETURNS THE FIRST BLOG POST

test("the first blog", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body[0].title).toBe("Modern Javascript");
}, 10000);

// TEST FOR CHECKING IF BLOGS CONTAINS A PARTICULAR BLOG

test("a specific blog is return ", async () => {
	const response = await api.get("/api/blogs");
	const contents = response.body.map((r) => r.title);
	expect(contents).toContain("Html is easy");
});

// TEST FOR ADDING NEW BLOG

test("a valid blog can be added", async () => {
	const newBlog = {
		title: "async/await simplifies making async calls",
		author: "James simpson",
		url: "https://github.com",
		likes: 10,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await helper.blogsInDb();
	expect(response).toHaveLength(helper.initialBlogs.length + 1);

	const contents = response.map((r) => r.title);
	expect(contents).toContain("async/await simplifies making async calls");
}, 10000);

// TEST FOR MAKING SURE WHEN USER SEND AN EMPTY BLOG OR MISSING PARTS
// OF A BLOG THE REQUEST IS NOT COMPLETED

test("blog without content is not added", async () => {
	const newBlog = {
		title: "You don't know js",
		author: "James simpson",
	};

	await api.post("/api/blogs").send(newBlog).expect(400);

	const response = await helper.blogsInDb();
	expect(response).toHaveLength(helper.initialBlogs.length);
}, 10000);

//TEST TO CHECK IF ID IS UNDEFINED

test('must have unique identifies "id"', () => {
	const blogs = 
});

afterAll(async () => {
	await mongoose.connection.close();
});
