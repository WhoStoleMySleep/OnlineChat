import '@testing-library/jest-dom';
import {
  render, screen
} from '@testing-library/react';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import Message from './Message';
import { MESSAGES_QUERY } from '../../GraphQl.queries';

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
        <Message
          id="123"
          MeAuthor="123"
          receivedAuthor="321"
          text="123"
          date={date}
        />
      </MockedProvider>
    );

    const message = screen.getByTestId('Message');

    expect(message).toMatchSnapshot();
  });

  it('asd', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Message
          id="123"
          MeAuthor="123"
          receivedAuthor="321"
          text="123"
          date=""
        />
      </MockedProvider>
    );

    const message = screen.getByTestId('Message');
    const messageDate = message.querySelector('.message__date');

    expect(messageDate).toBeNull();
  });
});
