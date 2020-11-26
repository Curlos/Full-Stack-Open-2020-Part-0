import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {incrementLikes, deleteBlog} from '../reducers/blogReducer'
import { setNotification, emptyNotification } from '../reducers/notificationReducer'

import Blog from './Blog'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
  
    return(
      <div>
          {blogs.map(blog =>
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
        )}
      </div>
    )
  }
  
  export default BlogList