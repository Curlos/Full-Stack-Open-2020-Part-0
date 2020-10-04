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

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.json(blog.toJSON());
	} else {
		response.status(404).end();
	}
});

blogsRouter.put("/:id", (request, response, next) => {
	const body = request.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then((updatedBlog) => {
			response.json(updatedBlog);
		})
		.catch((error) => next(error));
});

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

module.exports = blogsRouter;
