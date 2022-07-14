import { gql, useMutation } from '@apollo/react-hoc';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

  const { author } = useSelector(
    (state: { author: { author: string } }) => state.author
  );
  const [saveMessage] = useMutation(addMessageMutation);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;

    setText(targetValue);
  };

  const handleTarget = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text && author) {
      saveMessage({
        variables: {
          text,
          author,
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
        className="messages-input__input"
        value={text}
        placeholder="Enter your message"
        onChange={(event) => handleInput(event)}
      />
      <input type="submit" hidden />
    </form>
  );
};

export default MessagesInput;
