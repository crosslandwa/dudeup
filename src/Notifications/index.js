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
  warning: 'yellow',
  error: 'red'
}

const borderColor = {
  success: '#398440',
  warning: 'yellow',
  error: 'red'
}

const Notification = ({ text, type }) => (
  <div style={{
    backgroundColor: bgColor[type],
    border: `solid 1px ${borderColor[type]}`,
    borderRadius: '0.25em',
    marginBottom: '0.25em',
    display: 'flex',
    justifyContent: 'center'
  }}><span>{text}</span></div>
)

const Notifications = ({ notifications }) => notifications.length
  ? (
    <div style={{
      width: '100%',
      position: 'fixed',
      top: '0.25em',
      left: 0,
      zIndex: 2
    }}>
      {notifications.map(notification => <Notification {...notification} />)}
    </div>
  ) : null

export default connect(mapStateToProps)(Notifications)
