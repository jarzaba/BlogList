import blogReducer from './blogReducer';
import deepFreeze from 'deep-freeze';

describe('blogReducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = [];
    const action = {
      type: 'NEW_BLOG',
      data: {
        title: 'the app state is in redux store',
        author: 'Test User',
        url: 'www.jokublogi.fi',
        likes: 3,
        id: 1,
      },
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
  });
});
