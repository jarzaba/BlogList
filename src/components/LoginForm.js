import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actionCreators';
import { makeMessage } from '../redux/reducers/notificationReducer';
//import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  Collapse,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const LoginForm = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [openDetails, setOpenDetails] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with ', username, password);
    try {
      await dispatch(login(username, password, name, openDetails));
      setUsername('');
      setName('');
      setPassword('');
      openDetails &&
        dispatch(makeMessage(`Welcome aboard, ${name}!`, 'info', 5));
    } catch (exception) {
      dispatch(makeMessage(`That didn't work, please try again`, 'error', 5));
    }
  };

  const handleOpenDetails = () => {
    setOpenDetails(!openDetails);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box mt={2}>
      <Typography variant='h6'>Log in to application</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          type='text'
          label='username'
          id='username'
          value={username}
          name='Username'
          onChange={handleUsernameChange}
          fullWidth
        />
        <TextField
          type='password'
          label='password'
          id='password'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
          fullWidth
        />
        <Collapse in={openDetails} timeout='auto' unmountOnExit>
          <TextField
            type='text'
            label='fullname'
            id='fullname'
            value={name}
            name='Fullname'
            onChange={handleNameChange}
            fullWidth
          />
        </Collapse>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          type='submit'
          id='login-button'
          fullWidth
        >
          {openDetails ? 'register' : 'login'}
        </Button>
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
          <Typography variant='body2'>
            Not registered yet? Check the box and add your name
          </Typography>
          <Checkbox onChange={handleOpenDetails} />
        </div>
      </form>
    </Box>
  );
};

export default LoginForm;
