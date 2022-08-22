import '@testing-library/jest-dom';
import {
  render, screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import LogIn from './LogIn';

describe('LogIn Test', () => {
  it('Login snapshot', () => {
    render(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );

    const logIn = screen.getByTestId('logIn');

    expect(logIn).toMatchSnapshot();
  });

  it('LogIn name input', async () => {
    render(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );

    const input = screen.getByTestId('input');

    expect(input).toHaveValue('');

    userEvent.clear(input);

    expect(input).toHaveValue('');

    await userEvent.type(input, '123');

    expect(input).toHaveValue('123');

    userEvent.clear(input);
    await userEvent.type(input, '99999999999999999999999999'); // 26 symbol

    expect(input).toHaveValue('9999999999999999999999999'); // 25 symbol
  });
});
