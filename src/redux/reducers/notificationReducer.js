/* eslint-disable indent */
const initialstate = {
  info: '',
  style: '',
  id: '',
  visible: false,
};

const notificationReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'INFO_MESSAGE':
      return {
        info: action.data.msg,
        style: action.data.style,
        id: action.data.id,
        visible: true,
      };
    case 'HIDE_MESSAGE':
      return { id: action.data.id, visible: false };
    default:
      return state;
  }
};

const showMessage = (id, msg, style) => {
  return { type: 'INFO_MESSAGE', data: { msg, style, id } };
};
const hideMessage = (id) => {
  return { type: 'HIDE_MESSAGE', data: { id } };
};
let nextNotificationId = 0;
export const makeMessage = (msg, style, timer) => {
  return async (dispatch) => {
    const id = nextNotificationId++;
    dispatch(showMessage(id, msg, style));
    const seconds = timer * 1000;
    for (let i = 0; i < id + 10; i++) {
      clearTimeout(i);
    }
    setTimeout(() => {
      console.log(id);
      dispatch(hideMessage(id));
    }, seconds);
  };
};
export default notificationReducer;
