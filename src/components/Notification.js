import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  return notification.visible ? (
    <Alert severity={notification.style}>{notification.info}</Alert>
  ) : null;
};

export default Notification;
