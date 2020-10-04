const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(helper.initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(helper.initialBlogs[1]);
	await blogObject.save();
});

describe("when there is initially some blogs saved", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("all blogs are returned", async () => {
		const response = await api.get("/api/blogs");

		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test("a specific blog is within the returned blogs", async () => {
		const response = await api.get("/api/blogs");
		const titles = response.body.map((r) => r.title);
		expect(titles).toContain("Go To Statement Considered Harmful");
	});

	test("unique identifier property of the blog posts is named id", async () => {
		const response = await api.get("/api/blogs");
		const keys = response.body.map((r) => Object.keys(r));
		const keysTest = keys.map(
			(blogKeys) => blogKeys.includes("id") && !blogKeys.includes("_id")
		);
		expect(keysTest).not.toContain(false);
	});
});

describe("addition of a new blog", () => {
	test("a valid blog can be added", async () => {
		const newBlog = {
			title: "Lakers vs. Heat: How the teams match up in the NBA Finals",
			author: "Broderick Turner",
			url:
				"https://www.latimes.com/sports/lakers/story/2020-09-30/lakers-vs-heat-nba-finals-matchups",
			likes: 52335,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");
		const titles = response.body.map((r) => r.title);

		expect(titles).toContain(
			"Lakers vs. Heat: How the teams match up in the NBA Finals"
		);
		expect(expect(response.body).toHaveLength(helper.initialBlogs.length + 1));
	});

	test("if the likes property is missing from the request, it will default to the value 0", async () => {
		const newBlog = {
			title: "Lakers vs. Heat: How the teams match up in the NBA Finals",
			author: "Broderick Turner",
			url:
				"https://www.latimes.com/sports/lakers/story/2020-09-30/lakers-vs-heat-nba-finals-matchups",
			likes: undefined,
		};

		await api.post("/api/blogs").send(newBlog);

		const response = await api.get("/api/blogs");
		const keys = response.body.map((r) => Object.keys(r));

		const likes = response.body.map((blog) => blog.likes);

		expect(likes).not.toContain(undefined);
		expect(likes).toContain(0);
	});

	test(" if the title and url properties are missing response with code 400", async () => {
		const newBlog = {
			author: "Broderick Turner",
			likes: undefined,
		};

		await api.post("/api/blogs").send(newBlog).expect(400);
	});
});

describe("deletion of a blog", () => {
	test("succeeds with status code 204 if id is valid", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

		const titles = blogsAtEnd.map((r) => r.title);

		expect(titles).not.toContain(blogToDelete.title);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
