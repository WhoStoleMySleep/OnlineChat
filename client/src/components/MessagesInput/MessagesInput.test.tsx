import '@testing-library/jest-dom';
import {
  render, screen
} from '@testing-library/react';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import MessagesInput from './MessagesInput';
import { addMessageMutation } from '../../GraphQl.queries';
import store from '../../redux/store';

const date = new Date().toString();

const mocks = [{
  request: {
    query: addMessageMutation,
    variables: {
      text: '123',
      author: '123',
      date
    }
  },
  result: {
    data: {
      id: '123', text: '123', author: '321', date
    }
  }
}];

describe('Message', () => {
  it('Message snapshot', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <MessagesInput />
        </Provider>
      </MockedProvider>
    );

    const form = screen.getByTestId('form');

    expect(form).toMatchSnapshot();
  });

  it('asd', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <MessagesInput />
        </Provider>
      </MockedProvider>
    );

    const input = screen.getByTestId('input');

    setTimeout(async () => {
      await userEvent.type(input, 'await');

      expect(input).toHaveValue('await');

      await userEvent.type(input, '{enter}');

      expect(input).toHaveValue('');
    }, 2000);
  });
});
