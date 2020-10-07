import React, { useState } from "react";

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);

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

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button onClick={toggleVisibility} style={buttonStyle}>
				{visible === false ? "view" : "hide"}
			</button>
			<div style={showWhenVisible}>
				<p>{blog.url}</p>
				<p>
					likes {blog.likes}
					<button style={buttonStyle}>like</button>
				</p>
				<p>{blog.author}</p>
			</div>
		</div>
	);
};

export default Blog;
