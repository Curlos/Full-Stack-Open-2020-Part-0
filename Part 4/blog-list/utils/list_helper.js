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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
