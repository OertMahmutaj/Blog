const Notification = ({ message }) => {

  const notificationStyle = {
    color: 'red',
    fontStyle: 'bold'
  }

  if (message === null) {
    return null
  }

  return <div style={notificationStyle} className="error">{message}</div>
}

export default Notification