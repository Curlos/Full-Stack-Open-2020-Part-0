import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);
	const [likes, setLikes] = useState(blog.likes);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const buttonStyle = {
		margin: "6px",
	};

	const incrementLikes = async () => {
		const changedBlog = { ...blog, likes: blog.likes + 1 };

		try {
			const returnedBlog = await blogService.incrementLikes(
				blog.id,
				changedBlog
			);
			setLikes(likes + 1);
		} catch (exception) {
			console.log(exception);
		}
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button onClick={toggleVisibility} style={buttonStyle}>
				{visible === false ? "view" : "hide"}
			</button>
			<div style={showWhenVisible}>
				<p>{blog.url}</p>
				<p>
					likes {likes}
					<button style={buttonStyle} onClick={incrementLikes}>
						like
					</button>
				</p>
				<p>{blog.author}</p>
			</div>
		</div>
	);
};

export default Blog;
