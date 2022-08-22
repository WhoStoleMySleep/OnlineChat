import '@testing-library/jest-dom';
import {
  render, screen
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import PopUp from './PopUp';
import store from '../../redux/store';

describe('Message', () => {
  it('Message snapshot', async () => {
    render(
      <Provider store={store}>
        <PopUp headed="New messages!" />
      </Provider>
    );

    const popUp = screen.getByTestId('popUp');

    expect(popUp).toMatchSnapshot();
  });
});
