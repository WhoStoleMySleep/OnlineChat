import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import ContextMenu from './ContextMenu';

describe('ContextMenu', () => {
  it('Snapshot test', () => {
    render(
      <ContextMenu />
    );

    const contextMenu = screen.getByTestId('context-menu');

    expect(contextMenu).toMatchSnapshot();
  });
});
