import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const NotificationIcon = (props) => {
    return(
        <IconButton aria-label="notification" color="inherit">
              <Badge badgeContent={props.notificationNumber} color="secondary">
                <NotificationsIcon />
              </Badge>
        </IconButton>
    )
}

export default NotificationIcon;