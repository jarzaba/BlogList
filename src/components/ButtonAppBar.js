import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
} from '@material-ui/core';

//import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import AddBlogForm from './AddBlogForm';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
  },
  username: {
    fontSize: 12,
  },
  // blogform: {
  //   position: 'fixed',
  //   top: theme.spacing(10),
  //   left: theme.spacing(10),
  // },
}));

const ButtonAppBar = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newBlogForm, setNewBlogForm] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    window.localStorage.clear();
    dispatch({
      type: 'LOGOUT',
      data: null,
    });
    history.push('/');
  };

  const openNewBlogForm = () => {
    setNewBlogForm(!newBlogForm);
    console.log(newBlogForm);
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='primary'>
        <Toolbar>
          <Typography variant='h5' className={classes.title}>
            Simple Blog List
          </Typography>
          {user === null ? (
            ''
          ) : (
            <div>
              <Tooltip title='Add blog' aria-label='add' arrow>
                <Button color='inherit' size='small' onClick={openNewBlogForm}>
                  <AddIcon />
                </Button>
              </Tooltip>
              <Button
                color='inherit'
                size='small'
                onClick={() => history.push('/blogs')}
              >
                Blogs
              </Button>
              <Button
                color='inherit'
                size='small'
                onClick={() => history.push('/users')}
              >
                Users
              </Button>
              <IconButton
                classes={{ label: classes.iconButton }}
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <MenuIcon />
                <div></div>
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <AccountCircle />
                  {user.name}
                </MenuItem>
                <MenuItem onClick={handleLogout} to={'/'}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {newBlogForm && (
        //<Typography className={classes.fab}>UUSI BLOGI</Typography>
        <Box
          bgcolor='white'
          color='black'
          border={0}
          boxShadow={2}
          borderRadius={5}
          p={2}
          position='fixed'
          top={70}
          right='5%'
          zIndex='tooltip'
        >
          <AddBlogForm
            openNewBlogForm={openNewBlogForm}
            className={classes.blogform}
          />
          <div align='right'>
            <Button
              variant='text'
              color='primary'
              onClick={openNewBlogForm}
              align='right'
            >
              cancel
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
};

export default ButtonAppBar;
