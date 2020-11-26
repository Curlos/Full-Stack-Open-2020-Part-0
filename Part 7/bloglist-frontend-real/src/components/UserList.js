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
import { useSelector } from 'react-redux'

const UserList = () => {
    const users = useSelector(state => state.users)
    console.log(users)
  
    return(
      <div>
          {users.map(user =>
              <div>
                <Link to={`/users/${user.id}`}>{user.name}</Link>, blogs created: {user.blogs.length}
              </div>
        )}
      </div>
    )
  }
  
  export default UserList