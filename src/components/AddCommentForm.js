import React, { useState } from 'react';
import { Button, Box, TextField } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { createComment } from '../redux/actionCreators';
import { makeMessage } from '../redux/reducers/notificationReducer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 0,
  },
});

const AddCommentForm = ({ blogId }) => {
  const [newComment, setNewComment] = useState('');
  const classes = useStyles();

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const dispatch = useDispatch();

  const createNewComment = (event) => {
    event.preventDefault();
    const commentToAdd = {
      comment: newComment,
      blogId: blogId,
    };
    try {
      dispatch(createComment(commentToAdd, blogId));
      dispatch(
        makeMessage(`added a new comment: '${commentToAdd.comment}'`, 'info', 5)
      );
      setNewComment('');
    } catch (exception) {
      dispatch(
        makeMessage('Something went wrong, comment was not added', 'error', 5)
      );
    }
  };
  return (
    <Box>
      <form onSubmit={createNewComment}>
        <div
          style={{
            display: 'inline-flex',
            VerticalAlign: 'text-bottom',
            BoxSizing: 'inherit',
            textAlign: 'center',
            AlignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <TextField
            required
            id='comment'
            label='Add comment'
            value={newComment}
            onChange={handleCommentChange}
          />
          <Button
            className={classes.button}
            variant='outlined'
            color='primary'
            type='submit'
            size='small'
          >
            add
          </Button>
        </div>
      </form>
    </Box>
  );
};
export default AddCommentForm;
