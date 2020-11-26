import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {Form, Row, Col, Button} from 'react-bootstrap'

const BlogForm = (props) => {
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

			<Form>
				<Form.Group as={Row} controlId="formHorizontalTitle">
					<Form.Label column sm={1}>
					Title
					</Form.Label>
					<Col sm={5}>
						<Form.Control 
							type="email" 
							placeholder="Email" 
							onChange={({ target }) => setTitle(target.value)}
							/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalAuthor">
					<Form.Label column sm={1}>
					Author
					</Form.Label>
					<Col sm={5}>
						<Form.Control 
							type="password" 
							placeholder="Password" 
							onChange={({ target }) => setAuthor(target.value)}
							/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalUrl">
					<Form.Label column sm={1}>
					Url
					</Form.Label>
					<Col sm={5}>
						<Form.Control 
							type="password" 
							placeholder="Password" 
							onChange={({ target }) => setUrl(target.value)}/>
					</Col>
				</Form.Group>

				<Form.Group as={Row}>
					<Col sm={5}>
					<Button type="submit" onClick={addBlog}>{props.buttonLabel}</Button>
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
};


export default BlogForm;
