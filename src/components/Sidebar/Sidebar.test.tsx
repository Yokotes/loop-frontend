import React from 'react';
import { render, screen } from '@testing-library/react'
import Sidebar from './Sidebar';

describe('Testing sidebar', () => {
  let sidebar: HTMLElement;

  beforeAll(() => {
    render(<Sidebar />)
    sidebar = screen.getByTestId('sidebar-test');
  })

  test('should render in DOM', () => {
    expect(sidebar).toBeInTheDocument()
  })
})
