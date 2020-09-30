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
	let blogWithMostLikes = [];

	const maxValueOfLikes = Math.max(
		...arr1.map((blog) => {
			return blog.likes;
		}),
		0
	);

	console.log(maxValueOfLikes);

	return arr1.forEach((blog) => {
		if (blog.likes === maxValueOfLikes) {
			return blog;
		}
	});
};

module.exports = {
	dummy,
	totalLikes,
};
