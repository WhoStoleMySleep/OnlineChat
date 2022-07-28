import { faker } from '@faker-js/faker';
import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { setAuthor } from '../../redux/componentReducers/login';
import store from '../../redux/store';
import useSubmitAuthor from './useSubmitAuthor';

describe('useSubmitAuthor', () => {
  let authorName: string;

  beforeAll(() => {
    authorName = faker.name.firstName();
  });

  it('Correct usage', async () => {
    const wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;
    const { result: submitAuthorResult } = renderHook(() => useSubmitAuthor('onClick', 'form', 'open', authorName, setAuthor), { wrapper });
    const { onClick } = submitAuthorResult.current;

    const { result: selectorResult } = renderHook(() => useSelector(
      (state: { author: { author: string; }; }) => state.author
    ), { wrapper });
    const { author } = selectorResult.current;

    render(
      <Provider store={store}>
        <div>
          <form action="" className="form open" data-testid="form">
            <button type="submit" onClick={onClick} data-testid="button" hidden>submit</button>
          </form>
        </div>
      </Provider>
    );

    const form = screen.getByTestId('form');
    const button = screen.getByTestId('button');

    expect(author).toMatch('');
    expect(form).toHaveClass('form open');

    await userEvent.click(button);

    expect(selectorResult.current.author).toMatch(authorName);
    expect(form).toHaveClass('form');
  });

  it('No author name', () => {
    const { onClick } = useSubmitAuthor('onClick', 'form', 'open', '', setAuthor);

    expect(onClick()).toMatch('No data entered');
  });

  it('No class to add', () => {
    const { onClick } = useSubmitAuthor('onClick', 'form', '', authorName, setAuthor);

    expect(onClick()).toMatch('No data entered');
  });

  it('There is no element class on which to hang the class', () => {
    const { onClick } = useSubmitAuthor('onClick', '', 'open', authorName, setAuthor);

    expect(onClick()).toMatch('No data entered');
  });

  it('No function name', () => {
    const { func } = useSubmitAuthor('', 'form', 'open', authorName, setAuthor);

    expect(func()).toMatch('No data entered');
  });
});
