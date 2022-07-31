/* eslint-disable react/jsx-props-no-spreading */
import { faker } from '@faker-js/faker';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import useClassOpen from './useClassOpen';

describe('useClassOpen', () => {
  let randomClassName: string;

  beforeAll(() => {
    randomClassName = faker.word.adjective();
  });

  it('Correct usage', async () => {
    const { onClick } = useClassOpen('form', randomClassName);

    render(
      <div>
        <button type="button" onClick={onClick} data-testid="button">Open</button>
        <form action="" className="form" data-testid="form">1</form>
      </div>
    );

    const button = screen.getByTestId('button');
    const form = screen.getByTestId('form');

    await userEvent.click(button);

    expect(form).toHaveAttribute('class', `form ${randomClassName}`);

    await userEvent.click(button);

    expect(form).toHaveAttribute('class', `form ${randomClassName}`);
  });

  it('Incorrect class', async () => {
    const { onClick } = useClassOpen('none', randomClassName);

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
