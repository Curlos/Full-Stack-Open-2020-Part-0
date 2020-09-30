const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const newArr = blogs.map((blog) => blog.likes);
	return newArr.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		0
	);
};

const favoriteBlog = (blogs) => {
	blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
	const favBlog = blogs[0];
	return favBlog;
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return "No blogs in list";
	}

	let dict = new Map();
	blogs.forEach((blog) => {
		if (!dict.has(blog.author)) {
			dict.set(blog.author, 1);
		} else {
			dict.set(blog.author, dict.get(blog.author) + 1);
		}
	});

	let mostB = dict.get(blogs[0].author);
	let mostBlogsAuthor = blogs[0].author;

	dict.forEach((blogs, author) => {
		if (blogs > mostB) {
			mostB = blogs;
			mostBlogsAuthor = author;
		}
	});

	return {
		author: mostBlogsAuthor,
		blogs: mostB,
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
};
