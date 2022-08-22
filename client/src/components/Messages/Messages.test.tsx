import '@testing-library/jest-dom';
import {
  render, screen
} from '@testing-library/react';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import Messages from './Messages';
import { MESSAGES_QUERY } from '../../GraphQl.queries';
import store from '../../redux/store';

const date = new Date().toString();

const mocks = [{
  request: {
    query: MESSAGES_QUERY,
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
          <Messages />
        </Provider>
      </MockedProvider>
    );

    const messages = screen.getByTestId('Messages');

    expect(messages).toMatchSnapshot();
  });
});
