import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

function useClosePopUp(
  elementAddClassName: string,
  hiddenClassName: string,
  // eslint-disable-next-line no-unused-vars
  reducer: (value: []) => AnyAction
) {
  if (elementAddClassName && hiddenClassName && reducer) {
    return {
      onClick: () => {
        const dispatch = useDispatch();
        const element: HTMLDivElement | null = document.querySelector(`.${elementAddClassName}`);

        if (element) {
          element.classList.add(hiddenClassName);
          dispatch(reducer([]));
        }
      }
    };
  }

  return { onClick: () => {} };
}

export default useClosePopUp;
