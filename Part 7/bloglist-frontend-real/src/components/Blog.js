import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {incrementLikes, deleteBlog} from '../reducers/blogReducer'
import { setNotification, emptyNotification } from '../reducers/notificationReducer'
import {Button} from 'react-bootstrap'
import PropTypes from "prop-types";


const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch()

	if(!blog) {
		return null
	}

	const handleClickLike = () => {
		dispatch(incrementLikes(blog))
	}

	const handleClickDelete = () => {
		dispatch(deleteBlog(blog))
		dispatch(setNotification(`'${blog.title}' by ${blog.author} has been removed`, 5, false))
	  }

	const buttonStyle = {
		margin: "6px",
	};

	return (
		<div className="blog">
			<div className="authorAndTitle">
				<h2>{blog.title}</h2>
			</div>
			<div className="likesAndUrl">
				<a href={blog.url} target="_blank">{blog.url}</a>
				<p>
					<span className="likes-blog" value={blog.likes}>
						{blog.likes} likes
					</span>
					
					<Button
						style={buttonStyle}
						onClick={handleClickLike}
						className="likeButton"
					>
						like
					</Button>
				</p>
				<p>added by {blog.author}</p>
				{blog.user.username === blog.user.username &&
				blog.user.name === blog.user.name ? (
					<Button onClick={handleClickDelete}>remove</Button>
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
