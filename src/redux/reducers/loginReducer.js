const initialstate = JSON.parse(window.localStorage.getItem('loggedBlogUser'));

const loginReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      console.log('action data in login reducer: ', action.data);
      return action.data;
    case 'LOGOUT':
      return action.data;
    default:
      return state;
  }
};

export default loginReducer;
