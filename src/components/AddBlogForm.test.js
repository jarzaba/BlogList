import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlogForm from './AddBlogForm';

test('<AddBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();
  const component = render(<AddBlogForm createBlog={createBlog} />);
  const input = component.container.querySelector('#title');
  const form = component.container.querySelector('form');

  fireEvent.change(input, {
    target: { value: 'Title of a test blog' },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Title of a test blog');
});
test('<AddBlogForm /> calls submit event handler with right data', () => {
  const createBlog = jest.fn();
  const component = render(<AddBlogForm createBlog={createBlog} />);
  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'Title of a test blog' },
  });
  fireEvent.change(author, {
    target: { value: 'Testi Testaaja' },
  });
  fireEvent.change(url, {
    target: { value: 'www.jokublogi.fi' },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Title of a test blog');
  expect(createBlog.mock.calls[0][0].author).toBe('Testi Testaaja');
  expect(createBlog.mock.calls[0][0].url).toBe('www.jokublogi.fi');
});
