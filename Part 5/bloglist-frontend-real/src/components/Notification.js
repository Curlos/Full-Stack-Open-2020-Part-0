import React from "react";

const Notification = ({ message, err }) => {
	if (message === null) {
		return null;
	}

	if (err === false) {
		return <div className="success">{message}</div>;
	}

	return <div className="error">{message}</div>;
};

export default Notification;
