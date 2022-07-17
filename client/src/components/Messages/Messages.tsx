import React from 'react';
import MessagesInput from '../MessagesInput/MessagesInput';
import MessagesList from '../MessagesList/MessagesList';
import './Messages.scss';

function Messages() {
  return (
    <div className="messages">
      <MessagesList />
      <MessagesInput />
    </div>
  );
}

export default Messages;
