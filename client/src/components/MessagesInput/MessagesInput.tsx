import { gql, useMutation } from '@apollo/react-hoc';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCreateMessage from '../../hooks/useCreateMessage/useCreateMessage';
import useInputChange from '../../hooks/useInputChange/useInputChange';
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

  const { onChange: onInputChange } = useInputChange(setText);
  const { onSubmit: onFormSubmit } = useCreateMessage(text, author, 'messages-input__input', saveMessage, setText);

  useEffect(() => {
    const massageInput = document.querySelector('.messages-input__input');

    setTimeout(() => {
      massageInput?.removeAttribute('disabled');
    }, 2000);
  }, []);

  return (
    <form
      action=""
      className="messages-input"
      onSubmit={onFormSubmit}
    >
      <input
        className="messages-input__input"
        value={text}
        placeholder="Enter your message"
        onChange={onInputChange}
        disabled
      />
      <input type="submit" hidden />
    </form>
  );
}

export default MessagesInput;
