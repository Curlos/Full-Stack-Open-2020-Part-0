import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from "prop-types";

const BlogForm = () => {
	const [newTitle, setTitle] = useState("");
	const [newAuthor, setAuthor] = useState("");
	const [newUrl, setUrl] = useState("");

	const dispatch = useDispatch()

	const addBlog = (event) => {
		event.preventDefault();
		const newBlog = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		}

		setTitle("");
		setAuthor("");
		setUrl("");

		dispatch(createBlog(newBlog))
		dispatch(setNotification(`a new blog ${newTitle} by ${newAuthor} added`, 5, false))
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
				<button className="create-button" type="submit">
					create
				</button>
			</form>
		</div>
	);
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
