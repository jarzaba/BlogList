import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Button } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {},
  cardActions: {
    display: 'flex',
    justifyContent: 'flexEnd',
  },
  headerTitle: { fontSize: 20 },
  subHeaderTitle: { fontSize: 12 },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Blog = ({ blog, deleteBlog, updateBlog }) => {
  const [likes, setLikes] = useState(false);
  const [showBlogInfo, setShowBlogInfo] = useState(false);

  const classes = useStyles();
  const handleExpandClick = () => {
    setShowBlogInfo(!showBlogInfo);
  };

  // const blogStyle = {
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  const logged = JSON.parse(window.localStorage.getItem('loggedBlogUser'));

  const likeBlog = (blog) => {
    const newObject = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    likes
      ? (newObject.likes = blog.likes - 1)
      : (newObject.likes = blog.likes + 1);

    setLikes(!likes);

    return updateBlog(blog.id, newObject);
  };

  const delBlog = (id, title) => {
    if (window.confirm(`Do you really want to delete blog '${title}'`)) {
      deleteBlog(id);
    }
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.headerTitle,
          subheader: classes.subHeaderTitle,
        }}
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: showBlogInfo,
            })}
            onClick={handleExpandClick}
            aria-expanded={showBlogInfo}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={blog.title}
        subheader={blog.author}
      />
      <Collapse in={showBlogInfo} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography variant='body2' color='textPrimary' component='p'>
            {blog.url}
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            {blog.user.name === undefined ? '' : `added by: ${blog.user.name} `}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button
            component={Link}
            to={`/blogs/${blog.id}`}
            variant='outlined'
            style={{ flexGrow: 1 }}
          >
            View more
          </Button>
          <Typography variant='caption'>likes: {blog.likes}</Typography>
          <IconButton onClick={() => likeBlog(blog)}>
            {likes ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          {blog.user.username === logged.username && (
            <IconButton
              aria-label='delete'
              color='primary'
              onClick={() => delBlog(blog.id, blog.title)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Collapse>
    </Card>
  );
};

export default Blog;
