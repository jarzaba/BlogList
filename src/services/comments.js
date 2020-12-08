import axios from 'axios';
const baseUrl = '/api/comments';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `/api/blogs/${id}/comments`,
    newObject,
    config
  );
  return response.data;
};

export default { getAll, create, setToken };
