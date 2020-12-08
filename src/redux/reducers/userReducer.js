const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS': {
      return action.data;
    }
    default:
      return state;
  }
};

export default userReducer;
