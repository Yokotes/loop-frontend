import React from 'react';
import { render, screen } from '@testing-library/react'
import Sidebar from './Sidebar';
import { Provider } from 'react-redux';
import store from '../../models/store';

describe('Testing sidebar', () => {
  let sidebar: HTMLElement;

  beforeAll(() => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    )
    sidebar = screen.getByTestId('sidebar-test');
  })

  test('should render in DOM', () => {
    expect(sidebar).toBeInTheDocument()
  })
})
