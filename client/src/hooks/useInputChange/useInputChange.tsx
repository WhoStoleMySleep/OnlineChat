import { ChangeEvent, useState } from 'react';

// eslint-disable-next-line no-unused-vars
function useInputChange() {
  const [text, setText] = useState('');

  return {
    onChange: (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    text,
    setText
  };
}

export default useInputChange;
