//import blogService from '../../services/blogs';
const initialstate = JSON.parse(window.localStorage.getItem('blogsInStorage'));
const blogReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'NEW_BLOG': {
      return [...state, action.data];
    }
    case 'NEW_COMMENT': {
      return [...state, action.data];
    }
    case 'INIT_BLOGS': {
      return action.data;
    }
    case 'INIT_COMMENTS': {
      return action.data;
    }
    case 'LIKE': {
      const likedId = action.data.id;
      const blogToLike = state.find((n) => n.id === likedId);
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };
      console.log('blogtovote:', blogToLike);
      console.log('votedBlog:', likedBlog);
      return state.map((blog) => (blog.id !== likedId ? blog : likedBlog));
    }
    case 'DISLIKE': {
      const disLikeId = action.data.id;
      const blogToDisLike = state.find((n) => n.id === disLikeId);
      const disLikedBlog = {
        ...blogToDisLike,
        likes: blogToDisLike.likes - 1,
      };
      console.log('blogtovote:', blogToDisLike);
      console.log('votedBlog:', disLikedBlog);
      return state.map((blog) => (blog.id !== disLikeId ? blog : disLikedBlog));
    }
    case 'DELETE_BLOG': {
      return state.filter((blog) => blog.id !== action.data);
    }
    default: {
      return state;
    }
  }
};

export default blogReducer;
