import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const Notification = () => {
    const notification = useSelector(state => state.notifications)

    if (notification === null) {
        return null
    }

    if (notification.error === false) {
        return <div className="success">{notification.message}</div>
    } 

    return <div className="error">{notification.message}</div>
}

Notification.propTypes = {
    err: PropTypes.bool.isRequired,
}

export default Notification
