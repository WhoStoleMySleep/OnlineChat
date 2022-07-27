import { AnyAction } from '@reduxjs/toolkit';
import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';

function useSubmitAuthor(
  onChange: string,
  formClassName: string,
  openClassName: string,
  state: string,
  // eslint-disable-next-line no-unused-vars
  reducer: (value: string) => AnyAction
) {
  if (onChange && formClassName && openClassName && state && reducer) {
    const dispatch = useDispatch();

    return {
      [onChange]: (event?: SyntheticEvent<EventTarget>) => {
        event?.preventDefault();

        const form = document.querySelector(`.${formClassName}`);

        if (form && state) {
          form?.classList.remove('open');
          localStorage.setItem('author', state);
          dispatch(reducer(state));
        }
      }
    };
  }

  return { [onChange || 'func']: () => 'No data entered' };
}

export default useSubmitAuthor;
