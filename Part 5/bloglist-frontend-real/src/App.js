import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newBlog, setNewBlog] = useState("");
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newTitle, setTitle] = useState("");
	const [newAuthor, setAuthor] = useState("");
	const [newUrl, setUrl] = useState("");
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
			setErrorMessage("Wrong credentials");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const blogForm = () => (
		<form onSubmit={addBlog}>
			<input value={newBlog} onChange={handleBlogChange} />
			<button type="submit">save</button>
		</form>
	);

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);

	const createNewBlogForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				title
				<input
					type="text"
					value={newTitle}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					type="text"
					value={newAuthor}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					type="text"
					value={newUrl}
					name="Url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit">create</button>
		</form>
	);

	const addBlog = (event) => {
		event.preventDefault();
		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
			id: blogs.length + 1,
		};

		blogService.create(blogObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
			setNewBlog("");
		});
	};

	const handleBlogChange = (event) => {
		setNewBlog(event.target.value);
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem("loggedBlogAppUser");
	};

	return (
		<div>
			<h2>blogs</h2>

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

			<h2>create new</h2>
			{createNewBlogForm()}

			{user !== null && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
		</div>
	);
};

export default App;
