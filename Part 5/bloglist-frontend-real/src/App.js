import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
			blogService.setToken(user.token);

			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setError(true);
			setMessage("Wrong credentials");
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.clear();
		window.location.reload(false);
	};

	const loginForm = () => (
		<Togglable buttonLabel="login">
			<LoginForm
				username={username}
				password={password}
				handleUsernameChange={({ target }) => setUsername(target.value)}
				handlePasswordChange={({ target }) => setPassword(target.value)}
				handleSubmit={handleLogin}
			/>
		</Togglable>
	);

	const addBlog = (blogObject) => {
		blogService.create(blogObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));

			setError(false);
			setMessage(
				`a new blog ${blogObject.title} by ${blogObject.author} added`
			);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		});
	};

	const blogForm = () => (
		<Togglable buttonLabel="new blog">
			<BlogForm createBlog={addBlog} />
		</Togglable>
	);

	return (
		<div>
			<h2>blogs</h2>

			<Notification message={message} err={error} />

			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged-in <button onClick={handleLogout}>logout</button>{" "}
					</p>
					{blogForm()}
				</div>
			)}

			{user !== null && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
		</div>
	);
};

export default App;
