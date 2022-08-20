import React from 'react';
import MessagesInput from '../MessagesInput/MessagesInput';
import MessagesList from '../MessagesList/MessagesList';
import styles from './Messages.module.scss';

function Messages() {
  return (
    <div className={styles.messages}>
      <MessagesList />
      <MessagesInput />
    </div>
  );
}

export default Messages;
