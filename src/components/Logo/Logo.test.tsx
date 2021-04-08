import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from './Logo';

describe("Testing Logo component", () => {
  let logo: HTMLElement;

  beforeAll(() => {
    render(<Logo />);
    logo = screen.getByTestId("logo");
  })

  test('should be in document', () => {

    expect(logo).toBeInTheDocument();
  });
})