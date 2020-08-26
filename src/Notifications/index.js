import React from 'react'
import { connect } from 'react-redux'
import { notificationsSelector, removeNotification } from './interactions'
import { secondaryTextItalic } from '../styles'

const mapStateToProps = state => ({
  notifications: notificationsSelector(state)
})

const Notification = ({ text, type, onClick }) => (
  <div class={`du-notifications__item du-notifications__item--${type}`} onClick={onClick}>
    <span>{text}</span>
    <span style={secondaryTextItalic}>Click to dismiss</span>
  </div>
)

const Notifications = ({ notifications, removeNotification }) => notifications.length
  ? (
    <div class="du-notifications__container du-full-width-container__outer">
      <div class="du-full-width-container__inner">
        {notifications.map(notification => <Notification {...notification} onClick={removeNotification} />)}
      </div>
    </div>
  ) : null

export default connect(mapStateToProps, { removeNotification })(Notifications)
