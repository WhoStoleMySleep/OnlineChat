import { FormEvent } from 'react';

function useCreateMessage(
  text: string,
  author: string,
  inputClassName: string,
  // eslint-disable-next-line no-unused-vars
  saveMessage: (varriables: {variables: {text: string, author: string, date: string}}) => void,
  // eslint-disable-next-line no-unused-vars
  setText: (value: string) => void,
) {
  if (text && author && inputClassName && saveMessage && setText) {
    return {
      onSubmit: (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (text && author) {
          const input = document.querySelector(`.${inputClassName}`);
          const date = new Date().toString();

          saveMessage({
            variables: {
              text,
              author,
              date
            },
          });
          setText('');

          input?.setAttribute('disabled', 'disabled');

          setTimeout(() => {
            input?.removeAttribute('disabled');
          }, 2000);
        }
      }
    };
  }

  return { onSubmit: () => 'No data entered' };
}

export default useCreateMessage;
