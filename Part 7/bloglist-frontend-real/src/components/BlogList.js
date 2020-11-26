import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
  
    return(
      <div>
          {blogs.map(blog =>
              <div style={blogStyle}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </div>
              
        )}
      </div>
    )
  }

  /*
  <Blog 
              key={blog.id} 
              blog={blog} 
              user={blog.user} 
              handleClickLike={() => {
                dispatch(incrementLikes(blog))
              }} 
              handleClickDelete={() => {
                dispatch(deleteBlog(blog))
                dispatch(setNotification(`'${blog.title}' by ${blog.author} has been removed`, 5, false))
              }}/>
              */
  
  export default BlogList