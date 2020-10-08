import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
	const [newTitle, setTitle] = useState("");
	const [newAuthor, setAuthor] = useState("");
	const [newUrl, setUrl] = useState("");

	const addBlog = (event) => {
		event.preventDefault();
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		});

		setTitle("");
		setAuthor("");
		setUrl("");
	};

	return (
		<div>
			<h2>Create a new blog</h2>

			<form onSubmit={addBlog}>
				<div>
					title
					<input
						type="text"
						value={newTitle}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
						className="titleInput"
					/>
				</div>
				<div>
					author
					<input
						type="text"
						value={newAuthor}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
						className="authorInput"
					/>
				</div>
				<div>
					url
					<input
						type="text"
						value={newUrl}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
						className="urlInput"
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
