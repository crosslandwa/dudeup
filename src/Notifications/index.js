import React from 'react'
import { connect } from 'react-redux'
import { notificationsSelector, removeNotification } from './interactions'
import { secondaryTextItalic, highlightColor, warningColor } from '../styles'

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
  success: highlightColor,
  warning: warningColor
}

const Notification = ({ text, type, onClick }) => (
  <div
    style={{
      backgroundColor: bgColor[type],
      borderRadius: '0.05em',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0.03em 0.03em 0.1em 0.15em #6d6d6d',
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
