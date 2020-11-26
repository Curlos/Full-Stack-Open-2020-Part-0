import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useHistory,
  } from "react-router-dom"

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import User from './components/User'
import UserList from './components/UserList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import {useDispatch, useSelector} from 'react-redux'
import {initializeBlogs} from './reducers/blogReducer'
import {initializeUsers} from './reducers/userReducer'
import {setNotification} from './reducers/notificationReducer'

const App = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
    const users = useSelector(state => state.users)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)

            setUser(user)
            dispatch(setNotification(`${user.name} has logged in`, 5, false))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification('Wrong credentials', 5, true))
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.clear()
        window.location.reload(false)
    }

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
    )

    const blogForm = () => (
        <Togglable buttonLabel="new blog">
            <BlogForm />
        </Togglable>
    )

    blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))

    const userMatch = useRouteMatch('/users/:id')
    const urlUser = userMatch 
    ? users.find(user => user.id === userMatch.params.id)
    : null

    const blogMatch = useRouteMatch('/blogs/:id')
    const urlBlog = blogMatch 
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

    return (
        <div>
            <Notification />

            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>
                        
                        <Link to="/blogs" style={{padding: 5}}>blogs</Link>
                        <Link to="/users" style={{padding: 5}}>users</Link>
                        {user.name} logged-in <button onClick={handleLogout}>logout</button>{' '}
                    </p>
                </div>
            )}

            <h2>blog app</h2>

            <Switch>
                <Route path="/users/:id">
                    <User user={urlUser} />
                </Route>
                <Route path="/users">
                    <h2>Users</h2>
                    <UserList />
                </Route>
                <Route path="/blogs/:id">
                    <Blog blog={urlBlog} />
                </Route>
                <Route path="/">
                    {blogForm()}
                    {user !== null && <BlogList />}
                </Route>
                
            </Switch>
        </div>
    )
}

export default App
