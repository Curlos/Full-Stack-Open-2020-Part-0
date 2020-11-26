import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const User = ({user}) => {
  return (
    <div>
      <div>
        {user.name}, blogs created: {user.blogs.length}
      </div>
    </div>
  )
}

const UserList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    console.log(users)
  
    return(
      <div>
          {users.map(user =>
              <User user={user} />
        )}
      </div>
    )
  }
  
  export default UserList