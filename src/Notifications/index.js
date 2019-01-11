import React from 'react'
import { connect } from 'react-redux'
import { notificationsSelector, removeNotification } from './interactions'
import { secondaryTextItalic } from '../styles'

const mapStateToProps = state => ({
  notifications: notificationsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  removeNotification: e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation() // prevents bubbling to handlers added via document.addEventListener
    dispatch(removeNotification())
  }
})

const bgColor = {
  success: '#b1ffb8',
  warning: '#fded72'
}

const textColor = {
  success: '#0b7107',
  warning: '#7d7000'
}

const Notification = ({ text, type, onClick }) => (
  <div
    style={{
      backgroundColor: bgColor[type],
      borderRadius: '0.05em',
      border: `solid 1px ${textColor[type]}`,
      color: textColor[type],
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: 'rgb(200, 200, 200, 0.5) 0px 0px 0.05em 0.07em',
      padding: '0.5em',
      maxWidth: 800,
      cursor: 'pointer'
    }}
    onClick={onClick}
  >
    <span>{text}</span>
    <span style={secondaryTextItalic}>Click to dismiss</span>
  </div>
)

const Notifications = ({ notifications, removeNotification }) => notifications.length
  ? (
    <div style={{
      width: '80%',
      position: 'fixed',
      left: '50%',
      marginLeft: '-40%',
      bottom: '1em',
      zIndex: 1
    }}>
      {notifications.map(notification => <Notification {...notification} onClick={removeNotification} />)}
    </div>
  ) : null

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
