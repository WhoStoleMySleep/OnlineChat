import { gql, useMutation } from '@apollo/react-hoc';
import { ChangeEvent, FormEvent, useState } from 'react';
import './MessagesInput.scss';

const addMessageMutation = gql`
  mutation messageCreated($text: String!, $author: String!) {
    createMessage(text: $text, author: $author) {
      id
      text
      author
    }
  }
`;

const MessagesInput = () => {
  const [text, setText] = useState('');

  const [saveMessage] = useMutation(addMessageMutation);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;

    setText(targetValue);
  };

  const handleTarget = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const author: HTMLInputElement | null =
      document.querySelector('.log-in__author');

    if (text && author && author.value) {
      saveMessage({
        variables: {
          text,
          author: author.value,
        },
      });
      setText('');
    }
  };

  return (
    <form
      action=""
      className="messages-input"
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

export default MessagesInput;
