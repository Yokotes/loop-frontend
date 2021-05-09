import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './models/store';

describe('Testing app', () => {
  let app: HTMLElement;

  beforeAll(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    app = screen.getByTestId("app-test");
  })

  test('renders learn react link', () => {

    expect(app).toBeInTheDocument();
  });  
})
