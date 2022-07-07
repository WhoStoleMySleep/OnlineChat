import { ChangeEvent, FormEvent, useState } from 'react';
import './CommentsInput.scss';

const CommentsInput = () => {
  const [text, setText] = useState('');



  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;

    setText(targetValue);
  };

  const handleTarget = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text) {
      setText('');
    }
  };

  return (
    <form
      action=""
      className="comments-input"
      onSubmit={(event) => handleTarget(event)}
    >
      <input
        type="text"
        value={text}
        onChange={(event) => handleInput(event)}
      />
      <input type="submit" hidden />
    </form>
  );
};

export default CommentsInput;
