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
import {ListGroup} from 'react-bootstrap'

const UserList = () => {
    const users = useSelector(state => state.users)
    console.log(users)
  
    return(
      <div>
        <ListGroup>
          {users.map(user =>
                <div>
                  <ListGroup.Item className="listGroupItem">
                    <Link to={`/users/${user.id}`}>{user.name}</Link>, blogs created: {user.blogs.length}
                  </ListGroup.Item>
                  
                </div>
          )}
        </ListGroup>
      </div>
    )
  }
  
  export default UserList