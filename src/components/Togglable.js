import React, { useState, useImperativeHandle } from 'react';
import { Button } from '@material-ui/core/';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='contained' onClick={toggleVisibility}>
          {props.viewButtonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <br />
        <Button variant='contained' onClick={toggleVisibility}>
          {props.hideButtonLabel}
        </Button>
      </div>
    </div>
  );
});
Togglable.propTypes = {
  viewButtonLabel: PropTypes.string.isRequired,
};
Togglable.propTypes = {
  hideButtonLabel: PropTypes.string.isRequired,
};
Togglable.displayName = 'Togglable';

export default Togglable;
