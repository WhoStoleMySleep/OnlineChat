/* eslint-disable react/jsx-props-no-spreading */
import { MockedProvider } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MESSAGE_UPDATE } from '../../GraphQl.queries';
import { setUnreadMessages } from '../../redux/reducers/unreadMessages';
import store from '../../redux/store';
import useContextMenu from './useContextMenu';

const mocks = [
  {
    request: {
      query: MESSAGE_UPDATE,
      variables: {
        id: '123'
      }
    }
  }
];

describe('useClassOpen', () => {
  let randomClassName: string;

  beforeAll(() => {
    randomClassName = faker.word.adjective();
  });

  it('Correct usage', async () => {
    const wrapper = ({ children }: any) => (
      <MockedProvider mocks={mocks} addTypename={false}>{children}</MockedProvider>
    );

    const { result } = renderHook(() => useContextMenu('context-menu', 'active', 'reverse'), { wrapper });
    const { onContextMenu } = result.current;

    render(
      <form action="" className="form" data-testid="form">
        <h2>name</h2>
        <p>text</p>
      </form>
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
