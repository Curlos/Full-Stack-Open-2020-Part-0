import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, err }) => {
    if (message === null) {
        return null
    }

    if (err === false) {
        return <div className="success">{message}</div>
    }

    return <div className="error">{message}</div>
}

Notification.propTypes = {
    err: PropTypes.bool.isRequired,
}

export default Notification
