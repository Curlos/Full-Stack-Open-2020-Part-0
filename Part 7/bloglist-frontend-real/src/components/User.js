import React from 'react'

const User = ({user}) => {
    if(!user) {
      return null
    }
  
    return (
      <div>
        <h2>{user.name}</h2>
        <h1>added blogs</h1>
        <ul>
          {user.blogs.map((blog, i) => <li key={i}>{blog.title}</li>)}
        </ul>
        
      </div>
    )
}

export default User;