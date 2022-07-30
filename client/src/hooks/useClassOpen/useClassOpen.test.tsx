/* eslint-disable react/jsx-props-no-spreading */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import useClassOpen from './useClassOpen';

describe('useClassOpen', () => {
  it('Correct usage', async () => {
    const { onClick } = useClassOpen('form', 'open');

    render(
      <div>
        <button type="button" onClick={onClick} data-testid="button">Open</button>
        <form action="" className="form" data-testid="form">1</form>
      </div>
    );

    const button = screen.getByTestId('button');
    const form = screen.getByTestId('form');

    expect(onClick()).toMatch('Сorrect');

    await userEvent.click(button);

    expect(form).toHaveAttribute('class', 'form open');

    await userEvent.click(button);

    expect(form).toHaveAttribute('class', 'form open');
  });

  it('Incorrect class', async () => {
    const { onClick } = useClassOpen('none', 'open');

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
    const { onClick } = useClassOpen('', '');

    expect(onClick()).toBe('No data entered');
  });
});
