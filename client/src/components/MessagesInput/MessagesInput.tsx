import { useMutation } from '@apollo/react-hoc';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addMessageMutation } from '../../GraphQl.queries';
import useCreateMessage from '../../hooks/useCreateMessage/useCreateMessage';
import useInputChange from '../../hooks/useInputChange/useInputChange';
import styles from './MessagesInput.module.scss';

function MessagesInput() {
  const [saveMessage] = useMutation(addMessageMutation);
  const { author } = useSelector(
    (state: { author: { author: string } }) => state.author
  );

  const { onChange: onInputChange, text, setText } = useInputChange();
  const { onSubmit: onFormSubmit } = useCreateMessage(
    text,
    author,
    styles['messages-input__input'],
    saveMessage,
    setText
  );

  useEffect(() => {
    const massageInput = document.querySelector(`.${styles['messages-input__input']}`);

    setTimeout(() => {
      massageInput?.removeAttribute('disabled');
    }, 2000);
  }, []);

  return (
    <form
      action=""
      className={styles['messages-input']}
      onSubmit={onFormSubmit}
    >
      <input
        className={styles['messages-input__input']}
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
