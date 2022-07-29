import { ChangeEvent, useState } from 'react';

// eslint-disable-next-line no-unused-vars
function useInputChange(initialState: string = '') {
  const [text, setText] = useState(initialState.toString());

  return {
    onChange: (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    text,
    setText
  };
}

export default useInputChange;
