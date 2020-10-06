const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response, next) => {
	const body = request.body;
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}

	const user = await User.findById(decodedToken.id);
	console.log(user);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		user: user._id,
	});

	if (blog.title === undefined && blog.url === undefined) {
		response.status(400);
	}

	if (blog.likes === undefined) {
		blog.likes = 0;
	}

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	return response.json(savedBlog);
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
	/*
	const decodedToken = jwt.verify(
		request.token,
		process.env.SECRET,
		(err, user) => {
			if (err) {
				response.json(403);
			}
			console.log("User: ", user);
			console.log(request.user);
		}
	);
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	*/

	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

module.exports = blogsRouter;
