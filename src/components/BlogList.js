import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core/';

import {
  increaseLikes,
  decreaseLikes,
  deleteBlog,
} from '../redux/actionCreators';
import { makeMessage } from '../redux/reducers/notificationReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const BlogList = ({ blog }) => {
  const [open, setOpen] = useState(false);
  const [likeSymbol, setLikeSymbol] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const logged = JSON.parse(window.localStorage.getItem('loggedBlogUser'));

  const likeBlog = (id) => {
    likeSymbol ? dispatch(decreaseLikes(id)) : dispatch(increaseLikes(id));
    setLikeSymbol(!likeSymbol);
  };

  const confirmDelete = async (id, title) => {
    if (window.confirm(`Do you really want to delete blog '${title}'`)) {
      try {
        await dispatch(deleteBlog(id));
        dispatch(
          makeMessage(`'${title}' was deleted from the blog list`, 'info', 5)
        );
      } catch (error) {
        dispatch(makeMessage(`That didn't work, please try again`, 'error', 5));
      }
    }
  };

  const handleOpenList = () => {
    setOpen(!open);
  };

  if (!blog.user) {
    return null;
  }

  return (
    <List
      dense
      component='nav'
      aria-labelledby='nested-list-subheader'
      className={classes.root}
    >
      <ListItem button onClick={handleOpenList}>
        <ListItemText primary={blog.title} secondary={blog.author} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant='body2' color='textPrimary' component='p'>
                    {blog.url}
                  </Typography>
                  <Typography variant='caption' color='textSecondary'>
                    {blog.user &&
                      blog.user.name &&
                      `added by: ${blog.user.name} `}
                  </Typography>
                  <Typography variant='caption'>likes: {blog.likes}</Typography>
                  <IconButton onClick={() => likeBlog(blog.id)}>
                    {likeSymbol ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <Button
                    component={Link}
                    to={`/blogs/${blog.id}`}
                    variant='outlined'
                    style={{ flexGrow: 1 }}
                  >
                    View more
                  </Button>
                  {blog.user.username === logged.username && (
                    <IconButton
                      aria-label='delete'
                      color='primary'
                      onClick={() => confirmDelete(blog.id, blog.title)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default BlogList;
