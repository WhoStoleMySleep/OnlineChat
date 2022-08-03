import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import ContextMenu from './components/ContextMenu/ContextMenu';
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

  useEffect(() => {
    const messagesList = document.querySelector('.messages-list');
    const contextMenu = document.querySelector('.context-menu');

    messagesList!.addEventListener('scroll', () => {
      if (contextMenu && contextMenu.classList.contains('active')) {
        contextMenu.classList.remove('active');
      }
    });

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }, []);

  return (
    <div className="App">
      <ContextMenu />
      <LogIn />
      <Messages />
      <PopUp headed="New messages!" />
    </div>
  );
}

export default App;
