import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../models/store";
import Burger from "./Burger";

describe('Testing Burger button', () => {
  
  let burger: HTMLElement;

  beforeAll(() => {
    render(
      <Provider store={store}>
        <Burger />
      </Provider>
    );
    burger = screen.getByTestId('burger-test');
  });

  test('should be in DOM', () => {
    expect(burger).toBeInTheDocument();
  });
});
