import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleClickLike, handleClickDelete }) => {
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch()

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

	return (
		<div style={blogStyle} className="blog">
			<div className="authorAndTitle">
				{blog.title} {blog.author}
				<button
					className="view-button"
					onClick={toggleVisibility}
					style={buttonStyle}
				>
					{visible === false ? "view" : "hide"}
				</button>
			</div>
			<div style={showWhenVisible} className="likesAndUrl">
				<p>{blog.url}</p>
				<p>
					likes{" "}
					<span className="likes-blog" value={blog.likes}>
						{blog.likes}
					</span>
					<button
						style={buttonStyle}
						onClick={handleClickLike}
						className="likeButton"
					>
						like
					</button>
				</p>
				<p>{blog.author}</p>
				{user.username === blog.user.username &&
				user.name === blog.user.name ? (
					<button onClick={handleClickDelete}>remove</button>
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
