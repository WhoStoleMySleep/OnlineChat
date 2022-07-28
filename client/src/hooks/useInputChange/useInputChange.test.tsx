/* eslint-disable react/jsx-props-no-spreading */
import '@testing-library/jest-dom';
import {
  render, renderHook, screen, act
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { faker } from '@faker-js/faker';
import useInputChange from './useInputChange';

describe('useInputChange', () => {
  it('Correct usage', async () => {
    const { result } = renderHook(() => useInputChange());
    const { onChange, setText } = result.current;

    render(
      <div>
        <input type="text" onChange={onChange} data-testid="input" />
      </div>
    );

    const input = screen.getByTestId('input');

    expect(input).toHaveValue('');
    expect(result.current.text).toBe('');

    const loremText = faker.lorem.paragraph();

    await userEvent.type(input, loremText);

    expect(input).toHaveValue(loremText);
    expect(result.current.text).toBe(loremText);

    await userEvent.clear(input);

    expect(input).toHaveValue('');
    expect(result.current.text).toBe('');

    act(() => setText(loremText));

    expect(result.current.text).toBe(loremText);
  });
});
