import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state.map(obj => {
        return (
          obj.id === action.data.id ? {
            ...obj, 
            likes: obj.likes + 1
          } : obj
        )
      })
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return action.data
    case 'INIT_BLOGS':
      return action.data
    default: 
      return state
  }
}

export const incrementLikes = (newBlog) => {
  return async dispatch => {
    const changedBlog = { ...newBlog, likes: newBlog.likes + 1 };
    const incrementLikes = await blogService.incrementLikes(newBlog.id, changedBlog)
    console.log('lets go boiiis', incrementLikes)
    dispatch({
      type: 'INCREMENT',
      data: newBlog
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const deleteBlog = (blog) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    try {
      return async dispatch => {
        const blogs = await blogService.deleteBlog(blog.id)
        const newBlogs = await blogService.getAll()
        console.log('DELETED: ', newBlogs)
        dispatch({
          type: 'DELETE_BLOG',
          data: newBlogs,
        })
      }
    } catch (exception) {
      console.log(exception);
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer