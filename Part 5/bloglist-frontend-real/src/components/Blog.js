import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user }) => {
	const [visible, setVisible] = useState(false);
	const [likes, setLikes] = useState(blog.likes);

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
		const changedBlog = { ...blog, likes: likes + 1 };

		try {
			await blogService.incrementLikes(blog.id, changedBlog);
			setLikes(likes + 1);
		} catch (exception) {
			console.log(exception);
		}
	};

	const removeBlog = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			try {
				await blogService.deleteBlog(blog.id);
			} catch (exception) {
				console.log(exception);
			}
		}
	};

	console.log(blog);

	return (
		<div style={blogStyle}>
			<div className="authorAndTitle">
				{blog.title} {blog.author}
				<button className="view-button" onClick={toggleVisibility} style={buttonStyle}>
					{visible === false ? "view" : "hide"}
				</button>
			</div>
			<div style={showWhenVisible} className="likesAndUrl">
				<p>{blog.url}</p>
				<p>
					likes {likes}
					<button
						style={buttonStyle}
						onClick={incrementLikes}
						className="likeButton"
					>
						like
					</button>
				</p>
				<p>{blog.author}</p>
				{user.username === blog.user.username &&
				user.name === blog.user.name ? (
					<button onClick={removeBlog}>remove</button>
				) : (
					""
				)}
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

export default Blog;
