import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable viewButtonLabel='Add' hideButtonLabel='cancel'>
        <div className='testDiv' />
      </Togglable>
    );
  });

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('Add');
    const div = component.container.querySelector('.togglableContent');

    fireEvent.click(button);

    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', () => {
    const button = component.getByText('Add');
    const closeButton = component.getByText('cancel');
    const div = component.container.querySelector('.togglableContent');

    fireEvent.click(button);
    fireEvent.click(closeButton);

    expect(div).toHaveStyle('display: none');
  });
});
