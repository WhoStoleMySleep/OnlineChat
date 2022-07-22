import { gql, useMutation } from '@apollo/react-hoc';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState
} from 'react';
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

function MessagesInput() {
  const [text, setText] = useState('');
  const [saveMessage] = useMutation(addMessageMutation);
  const { author } = useSelector(
    (state: { author: { author: string } }) => state.author
  );

  useEffect(() => {
    const massageInput = document.querySelector('.messages-input__input');

    setTimeout(() => {
      massageInput?.removeAttribute('disabled');
    }, 2000);
  }, []);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;

    setText(targetValue);
  };

  const handleTarget = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text && author) {
      const massageInput = document.querySelector('.messages-input__input');

      saveMessage({
        variables: {
          text,
          author,
        },
      });
      setText('');

      massageInput?.setAttribute('disabled', 'disabled');

      setTimeout(() => {
        massageInput?.removeAttribute('disabled');
      }, 2000);
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
        disabled
      />
      <input type="submit" hidden />
    </form>
  );
}

export default MessagesInput;
