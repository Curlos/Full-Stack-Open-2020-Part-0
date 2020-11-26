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
import {ListGroup} from 'react-bootstrap'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
  
    return(
      <div>
        <ListGroup>
          {blogs.map(blog =>
                <div>
                  <ListGroup.Item className="listGroupItem">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </ListGroup.Item>
                </div>
                
          )}
        </ListGroup>
      </div>
    )
  }
  
  export default BlogList