// import Push from 'push.js';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Push from 'push.js';
import ContextMenu from './components/ContextMenu/ContextMenu';
import contextMenuStyles from './components/ContextMenu/ContextMenu.module.scss';
import LogIn from './components/LogIn/LogIn';
import Messages from './components/Messages/Messages';
import messagesListStyles from './components/MessagesList/MessagesList.module.scss';
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
    const messagesList = document.querySelector(`.${messagesListStyles['messages-list']}`);
    const contextMenu = document.querySelector(`.${contextMenuStyles['context-menu']}`);

    messagesList!.addEventListener('scroll', () => {
      if (contextMenu && contextMenu.classList.contains(contextMenuStyles.active)) {
        contextMenu.classList.remove(contextMenuStyles.active);
      }
    });

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    Push.Permission.request();
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
