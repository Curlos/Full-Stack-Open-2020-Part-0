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

const nonExistingId = async () => {
	const blog = new Blog({ content: "willremovethissoon", date: new Date() });
	await blog.save();
	await blog.remove();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
};
