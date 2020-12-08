import React, { useState } from 'react';
import { Typography, Button, Box, TextField } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { createBlog } from '../redux/actionCreators';
import { makeMessage } from '../redux/reducers/notificationReducer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const AddBlogForm = (props) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const classes = useStyles();

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const dispatch = useDispatch();

  const createNewBlog = (event) => {
    event.preventDefault();
    props.openNewBlogForm();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    try {
      dispatch(createBlog(newBlog));
      dispatch(
        makeMessage(
          `added a new blog: '${newBlog.title}' by ${newBlog.author}`,
          'info',
          5
        )
      );
      setNewAuthor('');
      setNewTitle('');
      setNewUrl('');
    } catch (exception) {
      dispatch(
        makeMessage('Something went wrong, blog was not added', 'error', 5)
      );
    }
  };

  return (
    <Box maxWidth={480} m={2} mx='auto'>
      <Typography variant='h5'>Add new blog</Typography>
      <form onSubmit={createNewBlog}>
        <TextField
          required
          id='title'
          label='Title'
          value={newTitle}
          onChange={handleTitleChange}
          fullWidth
        />{' '}
        <TextField
          id='author'
          label='Author'
          value={newAuthor}
          onChange={handleAuthorChange}
          fullWidth
        />
        <TextField
          required
          id='url'
          label='url'
          value={newUrl}
          onChange={handleUrlChange}
          fullWidth
        />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          type='submit'
          fullWidth
        >
          save
        </Button>
      </form>
    </Box>
  );
};
export default AddBlogForm;
