import MessagesInput from '../MessagesInput/MessagesInput';
import MessagesList from '../MessagesList/MessagesList';
import './Messages.scss';

const Messages = () => {
  return (
    <div className="messages">
      <MessagesList />
      <MessagesInput />
    </div>
  );
};

export default Messages;
