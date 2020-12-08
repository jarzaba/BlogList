import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(' WOOP WOOP ');

  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const logged = JSON.parse(window.localStorage.getItem('loggedBlogUser'));
  const loggedToken = `bearer ${logged.token}`;

  const config = {
    headers: { Authorization: loggedToken },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, type) => {
  const config = {
    headers: { Authorization: token },
  };
  const changedLikes = type === 'increase' ? 1 : -1;
  const selectedBlog = await axios.get(`${baseUrl}/${id}`);
  const blogWithAddedLikes = {
    author: selectedBlog.data.author,
    title: selectedBlog.data.title,
    url: selectedBlog.data.url,
    likes: selectedBlog.data.likes + changedLikes,
    user: selectedBlog.data.user,
  };

  const response = await axios.put(
    `${baseUrl}/${id}`,
    blogWithAddedLikes,
    config
  );
  console.log('adding likes to db response: ', response.data);

  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, getOne, create, update, remove, setToken };
