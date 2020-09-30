const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const initialBlogs = [
	{
		_id: "5f73b157db1c0bf60bad5b83",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
			"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5f73d9c67db76c009eba7ba5",
		title: "4 factors that could help Heat upset Lakers",
		author: "Sekou Smith",
		url:
			"https://www.nba.com/article/2020/09/29/4-factors-how-heat-can-upset-lakers",
		likes: 50,
		__v: 0,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
});

const api = supertest(app);

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
	const response = await api.get("/api/blogs");

	const titles = response.body.map((r) => r.title);
	expect(titles).toContain("Go To Statement Considered Harmful");
});

afterAll(() => {
	mongoose.connection.close();
});
