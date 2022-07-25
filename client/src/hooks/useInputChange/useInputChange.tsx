import { ChangeEvent } from 'react';

// eslint-disable-next-line no-unused-vars
function useInputChange(setText: (text: string) => void) {
  if (setText) {
    return {
      onChange: (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    };
  }

  return { onChange: () => {} };
}

export default useInputChange;
