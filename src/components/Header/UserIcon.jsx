import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

// props contains {menuId, }
const UserIcon = (props) => {


    return(
        <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={props.menuId}
        aria-haspopup="true"
        onClick={props.handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    )
}


export default UserIcon;