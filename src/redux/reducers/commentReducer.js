//import blogService from '../../services/blogs';

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COMMENTS': {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default commentReducer;
