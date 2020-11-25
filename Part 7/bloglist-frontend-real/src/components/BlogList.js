import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, emptyNotification } from '../reducers/notificationReducer'

import Blog from './Blog'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
  
    return(
      <div>
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} user={blog.user} />
        )}
      </div>
    )
  }
  
  export default BlogList