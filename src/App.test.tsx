import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Testing app', () => {
  let app: HTMLElement;

  beforeAll(() => {
    render(<App />);
    app = screen.getByTestId("app-test");
  })

  test('renders learn react link', () => {

    expect(app).toBeInTheDocument();
  });  
})
