import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import { getIsSignedIn } from '../../reducks/users/selectors';
import icon from '../../assets/icon.png';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {push} from 'connected-react-router';
import {signOut} from '../../reducks/users/operations';
import { UserIcon} from '.';


// UI style
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    //backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      //backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = () => {
  // declear style
  const classes = useStyles();

  // get state
  const selector = useSelector(state => state);
  const isSignedIn = getIsSignedIn(selector);


  // declear dispatch
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorMenuBarEl, setAnchorMenuBarEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  // check open (open = true)
  const isMenuOpen = Boolean(anchorEl);
  const isMenuBarOpen = Boolean(anchorMenuBarEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuBarClose = () => {
    setAnchorMenuBarEl(null);
  };

  // Log out 処理
  const handleLogout = () => {
    handleMenuClose();
    dispatch(signOut());
  }

  const handleLogin = () => {
    handleMenuClose();
    dispatch(push('signin'));
  }

  const handleGroupList = () => {
    dispatch(push('/group/list'));
    handleMenuBarClose();
  }

  const handleHome = () => {
    dispatch(push('/'));
    handleMenuBarClose();
  }

  const handleNewGroup = () => {
    dispatch(push('/group/edit'));
    handleMenuBarClose();
  }

  const handleMenuBarOpen = (event) => {
    setAnchorMenuBarEl(event.currentTarget);
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  // for PC
  const menuId = 'user-menu';
  const menuBarId = 'bar-menu';
  // barr menu just like accordion
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
        isSignedIn
        ? <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
        : <MenuItem onClick={handleLogin}>LOGIN</MenuItem>
      }
    </Menu>
  );

  const renderMenuBar = (
    <Menu
      anchorEl={anchorMenuBarEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menuBarId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuBarOpen}
      onClose={handleMenuBarClose}
    >
      {
        isSignedIn
        ? <div>
            <MenuItem onClick={handleHome}>ホーム</MenuItem>
            <MenuItem onClick={handleGroupList}>所属グループ一覧</MenuItem>
            <MenuItem onClick={handleNewGroup}>新規グループ作成</MenuItem>
          </div>
        : <MenuItem onClick={handleLogin}>LOGIN</MenuItem>
      }
    </Menu>
  );

  // for Mobile phone
  const mobileMenuId = 'user-menu-mobile';
  // 3 dots to open the menu on mobiles
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        isSignedIn
        ? <MenuItem onClick={handleLogout}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>LOGOUT</p>
          </MenuItem>
        : <MenuItem onClick={handleLogin}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>LOGIN</p>
          </MenuItem>
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          {/* タスクバー */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {/* メニューバー */}
            <MenuIcon menuBarId={menuBarId} onClick={handleMenuBarOpen} />
          </IconButton>
          <img src={icon} alt='Icon' width='128px' onClick={() => {dispatch(push('/'));}} role='button' />

          {/* アイコンを右に寄せるための空間調整 */}
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            {/* 通知アイコン */}
            {/* <NotificationIcon notificationNumber={1} /> */}

            {/* ユーザーアイコン done*/}
            <UserIcon menuId={menuId} handleProfileMenuOpen={handleProfileMenuOpen} />
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMenuBar}
      {renderMobileMenu}
    </div>
  );
}

export default Header;