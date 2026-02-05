const Notification = ({message, type}) => {
	if (message === null) {
		return null
	}

	switch (type) {
		case 'error':
			return (
				<div className="error">
					{message}
				</div>
			)
		case 'notice':
			return (
				<div className="notice">
					{message}
				</div>
			)
	}
}

export default Notification
