import './App.scss';
import Messages from './components/Messages/Messages';
import LogIn from './components/LogIn/LogIn';
import { useEffect } from 'react';
import PopUp from './components/PopUp/PopUp';
import { useSelector } from 'react-redux';

function App() {
  const { unreadMessages } = useSelector(
    (state: { unreadMessages: { unreadMessages: string[] } }) =>
      state.unreadMessages
  );

  useEffect(() => {
    if (unreadMessages.length) {
      document.title = 'New messages!';
    } else {
      document.title = 'OnlineChat';
    }
  }, [unreadMessages.length]);

  return (
    <div className="App">
      <LogIn />
      <Messages />
      <PopUp headed={'New messages!'} />
    </div>
  );
}

export default App;
