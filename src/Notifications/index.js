import React from 'react'
import { connect } from 'react-redux'
import { notificationIdsSelector, notificationTextSelector, notificationTypeSelector } from './interactions'

const mapStateToProps = state => ({
  notifications: notificationIdsSelector(state).map(id => ({
    id,
    text: notificationTextSelector(state, id),
    type: notificationTypeSelector(state, id)
  }))
})

const bgColor = {
  success: '#b1ffb8',
  warning: '#fded72'
}

const textColor = {
  success: '#0b7107',
  warning: '#7d7000'
}

const Notification = ({ text, type }) => (
  <div style={{
    backgroundColor: bgColor[type],
    borderRadius: '0.05em',
    border: `solid 1px ${textColor[type]}`,
    color: textColor[type],
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'rgb(200, 200, 200, 0.5) 0px 0px 0.05em 0.07em',
    padding: '0.5em',
    maxWidth: 800
  }}><span>{text}</span></div>
)

const Notifications = ({ notifications }) => notifications.length
  ? (
    <div style={{
      width: '80%',
      position: 'fixed',
      left: '50%',
      marginLeft: '-40%',
      bottom: '1em',
      zIndex: 1
    }}>
      {notifications.slice(-1).map(notification => <Notification {...notification} />)}
    </div>
  ) : null

export default connect(mapStateToProps)(Notifications)
