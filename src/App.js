import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

// --- Redux --->
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, initializeComments } from './redux/actionCreators';

// --- Components --->
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import ButtonAppBar from './components/ButtonAppBar';
import UserList from './components/UserListTable';
import UserDetails from './components/UserDetails';

// --- Material UI --->
import { Box } from '@material-ui/core/';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(initializeComments());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.loggedUser);
  const logged = JSON.parse(window.localStorage.getItem('loggedBlogUser'));
  if (logged) {
    window.localStorage.setItem('blogsInStorage', JSON.stringify(blogs));
  }

  const blogMatch = useRouteMatch('/blogs/:id');
  const userMatch = useRouteMatch('/users/:id');

  const selectedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  const selectedBlogUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <Box maxWidth={480} mt={0} mx='auto'>
      <ButtonAppBar user={user ? user : null} />
      <Box height={70}></Box>
      <Notification />
      <Switch>
        <Route exact path='/blogs/:id'>
          <BlogDetails blog={selectedBlog} />
        </Route>
        <Route exact path='/blogs'>
          {user === null ? (
            <LoginForm />
          ) : (
            <div>
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <BlogList key={blog.id} blog={blog} />
                ))}
            </div>
          )}
        </Route>
        <Route exact path='/users/:id'>
          <UserDetails user={selectedBlogUser} blogs={blogs} />
        </Route>
        <Route exact path='/users'>
          <UserList />
        </Route>
        <Route path='/'>
          <Redirect to='/blogs' />
        </Route>
      </Switch>
    </Box>
  );
};

export default App;
