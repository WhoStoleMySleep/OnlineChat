import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import LogIn from './components/LogIn/LogIn';
import Messages from './components/Messages/Messages';
import PopUp from './components/PopUp/PopUp';

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
      <PopUp headed="New messages!" />
    </div>
  );
}

export default App;
