import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

function useClosePopUp(
  elementAddClassName: string,
  hiddenClassName: string,
  // eslint-disable-next-line no-unused-vars
  reducer: (value: []) => AnyAction
) {
  if (elementAddClassName && hiddenClassName && reducer) {
    const dispatch = useDispatch();

    return {
      onClick: () => {
        const element: HTMLDivElement | null = document.querySelector(`.${elementAddClassName}`);

        if (element) {
          element.classList.add(hiddenClassName);

          dispatch(reducer([]));
        } else {
          return 'undefined \'elementAddClassName\'';
        }

        return 'Correct';
      }
    };
  }

  return { onClick: () => 'No data entered' };
}

export default useClosePopUp;
