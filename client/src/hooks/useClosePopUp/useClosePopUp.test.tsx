/* eslint-disable react/jsx-props-no-spreading */
import { faker } from '@faker-js/faker';
import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { setUnreadMessages } from '../../redux/reducers/unreadMessages';
import store from '../../redux/store';
import useClosePopUp from './useClosePopUp';

describe('useClassOpen', () => {
  let randomClassName: string;

  beforeAll(() => {
    randomClassName = faker.word.adjective();
  });

  it('Correct usage', async () => {
    const wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;

    const { result: useClosePopUpResult } = renderHook(() => useClosePopUp('form', randomClassName, setUnreadMessages), { wrapper });
    const { onClick } = useClosePopUpResult.current;

    render(
      <Provider store={store}>
        <form action="" className="form" data-testid="form">
          <button type="button" onClick={onClick} data-testid="button">Close</button>
        </form>
      </Provider>
    );

    const button = screen.getByTestId('button');
    const form = screen.getByTestId('form');

    await userEvent.click(button);

    expect(form).toHaveClass(`form ${randomClassName}`);

    await userEvent.click(button);

    expect(form).toHaveClass(`form ${randomClassName}`);
  });

  it('Incorrect class', async () => {
    const wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;
    const { result: useClosePopUpResult } = renderHook(() => useClosePopUp('none', randomClassName, setUnreadMessages), { wrapper });
    const { onClick } = useClosePopUpResult.current;

    render(
      <div>
        <button type="button" onClick={onClick} data-testid="button">Open</button>
        <form action="" className="form" data-testid="form">1</form>
      </div>
    );

    const button = screen.getByTestId('button');
    const form = screen.getByTestId('form');

    expect(onClick()).toMatch('undefined \'elementAddClassName\'');

    await userEvent.click(button);

    expect(form).toHaveAttribute('class', 'form');
    expect(onClick()).toMatch('undefined \'elementAddClassName\'');
  });

  it('Lack of elements', () => {
    const wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;
    const { result: useClosePopUpResult } = renderHook(() => useClosePopUp('', '', setUnreadMessages), { wrapper });
    const { onClick } = useClosePopUpResult.current;

    expect(onClick()).toBe('No data entered');
  });
});
