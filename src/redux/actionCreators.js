import blogService from '../../src/services/blogs';
import loginService from '../../src/services/login';
import userService from '../../src/services/users';
import commentService from '../../src/services/comments';
import store from './store';

export const createBlog = (data) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(data);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
    // dispatch(initializeBlogs);
  };
};

export const createComment = (data, id) => {
  return async (dispatch) => {
    const newComment = await commentService.create(data, id);
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const blogToDelete = await blogService.remove(id);
    console.log(blogToDelete);

    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const initializeComments = () => {
  return async (dispatch) => {
    const comments = await commentService.getAll();
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments,
    });
  };
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: users,
    });
  };
};

export const decreaseLikes = (id) => {
  return async (dispatch) => {
    const updateLike = await blogService.update(id, 'decrease');
    console.log('decrease: ', updateLike);
    dispatch({
      type: 'DISLIKE',
      data: updateLike,
    });
  };
};

export const increaseLikes = (id) => {
  return async (dispatch) => {
    const updateLike = await blogService.update(id, 'increase');
    console.log('increase: ', updateLike);
    dispatch({
      type: 'LIKE',
      data: updateLike,
    });
  };
};

export const login = (username, password, name, register) => {
  return async (dispatch) => {
    if (register) {
      const newUser = { username, name, password };
      await userService.create(newUser);
    }
    const user = await loginService.loginToDb({
      username,
      password,
    });
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));

    dispatch({
      type: 'LOGGED_IN',
      data: user,
    });
    console.log('user in actioncreators:', user);
    blogService.setToken(user.token);
    // const state = store.getState((state) => state);
    // const loggedUser = state.loggedUser;
    // console.log(loggedUser);
  };
};

export const logout = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.loginToDb({
      username,
      password,
    });

    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
    dispatch({
      type: 'LOGGED_IN',
      data: user,
    });
    console.log('user in actioncreators:', user);
    blogService.setToken(user.token);
    const state = store.getState((state) => state);
    const loggedUser = state.loggedUser;
    console.log(loggedUser);
  };
};
