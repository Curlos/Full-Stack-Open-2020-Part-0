const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response, next) => {
	const blog = new Blog(request.body);

	if (blog.title === undefined && blog.url === undefined) {
		response.status(400);
	}

	if (blog.likes === undefined) {
		blog.likes = 0;
	}

	const savedBlog = await blog.save();
	response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

module.exports = blogsRouter;
