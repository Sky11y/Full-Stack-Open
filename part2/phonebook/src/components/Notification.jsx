const Notification = ({message, type}) => {
	if (message === null) {
		return null
	}

	switch (type) {
		case 'delete':
			return (
				<div className="delete">
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
