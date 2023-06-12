const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../model/blog");
const helper = require("../test/test_helper");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
}, 10000);

// TEST TO CHECK IF THE API IS IN "APPLICTION/JSON FORMAT"

describe("when there is initially some blogs added", () => {
	test("blog list are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect("Content-Type", /application\/json/)
			.expect(200);
	}, 10000);

	// TEST ALL BLOGS ARE RETURNED

	test("test all blogs are returned", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test("a specific blog is within the returned blogs ", async () => {
		const response = await api.get("/api/blogs");
		const contents = response.body.map((r) => r.title);
		expect(contents).toContain("Html is easy");
	}, 10000);
});

describe("viewing a specific note", () => {
	test("should succed with a valid id", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToView = blogsAtStart[0];

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(resultBlog.body).toEqual(blogToView);
	});

	test("should fail if id is invalid", async () => {
		const id = "5a3d5da59070081a82a3445";

		await api.get(`/api/blogs/${id}`).expect(400);
	});
});

describe("addition new blog", () => {
	test("should succeed with valid data", async () => {
		const newBlog = {
			title: "You don't know js",
			author: "Simpson",
			url: "https://github.com",
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await helper.blogsInDb();
		expect(response).toHaveLength(helper.initialBlogs.length + 1);

		const contents = response.map((r) => r.title);
		expect(contents).toContain("You don't know js");
	});

	test("should fail with statsCode if data invalid", async () => {
		const newBlog = {
			title: "You don't know js",
			author: "Simpson",
			likes: 10,
		};

		await api.post("/api/blogs").send(newBlog).expect(400);

		const blogAtEnd = await helper.blogsInDb();
		expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
	});
});

describe("deletion of note", () => {
	test("should succeed with valid id", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogInDb = await helper.blogsInDb();
		expect(blogInDb).toHaveLength(helper.initialBlogs.length - 1);

		const remainingBlog = blogInDb.map((blog) => blog.title);
		expect(remainingBlog).not.toContain(blogToDelete.title);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
