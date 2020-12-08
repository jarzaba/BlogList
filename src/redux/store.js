import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from '../redux/reducers/blogReducer';
import notificationReducer from '../redux/reducers/notificationReducer';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';
import commentReducer from './reducers/commentReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer,
  loggedUser: loginReducer,
  comments: commentReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
