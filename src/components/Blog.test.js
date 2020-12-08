import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import testData from '../utils/test-data';

window.localStorage.setItem(
  'loggedBlogUser',
  JSON.stringify(testData.testUser)
);

test('renders content', () => {
  const component = render(<Blog blog={testData.blog} />);

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

test('renders title and author, but not url or likes', () => {
  const component = render(<Blog blog={testData.blog} />);
  const title = component.getByText(
    'Component testing is done with react-testing-library'
  );
  const author = component.getByText('Testi Testaaja');

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(component.container).not.toHaveTextContent('www.jokublogi.fi');
});

test('renders url and likes after view button has been pressed', () => {
  const component = render(<Blog blog={testData.blog} />);
  const viewButton = component.container.querySelector('.view');
  fireEvent.click(viewButton);

  const title = component.getByText(
    'Component testing is done with react-testing-library'
  );
  const author = component.getByText('Testi Testaaja');
  const url = component.getByText('www.jokublogi.fi');
  const likes = component.getByText('likes: 3');

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test('clicking the like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn();
  const component = render(
    <Blog
      blog={testData.blog}
      likeBlog={mockHandler}
      updateBlog={mockHandler}
    />
  );
  const viewButton = component.container.querySelector('.view');
  fireEvent.click(viewButton);
  const likeButton = component.container.querySelector('.like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
