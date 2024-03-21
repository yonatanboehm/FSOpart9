const Notification = ({notification}: {notification: string}) => {
  if (notification === '') {
    return null
  }
  const notificationStyle= {
    color: "red"
  }
  return (
    <div style={notificationStyle}>
      {notification}
    </div>
  )
}

export default Notification