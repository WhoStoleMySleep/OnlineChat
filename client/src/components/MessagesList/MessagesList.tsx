import { gql, useQuery, useSubscription } from '@apollo/react-hoc';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import notificationSfx from '../../assets/sounds/notification.mp3';
import useContextMenu from '../../hooks/useContextMenu/useContextMenu';
import useRetainUpdatedValue from '../../hooks/useRetainUpdatedValue/useRetainUpdatedValue';
import { setMessages } from '../../redux/componentReducers/messages';
import { setUnreadMessages } from '../../redux/componentReducers/unreadMessages';
import './MessagesList.scss';

const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageCreated {
    messageCreated {
      id
      text
      author
      date
    }
  }
`;

const MESSAGES_UPDATED = gql`
  subscription MessageUpdated {
    messageUpdated {
      id
      text
    }
  }
`;

const MESSAGES_REMOVED = gql`
  subscription MessageUpdated {
    messageRemoved {
      id
    }
  }
`;

const MESSAGES_QUERY = gql`
  query Messages {
    messages {
      id
      text
      author
      date
    }
  }
`;

function MessagesList() {
  const [editId, setEditId] = useState('');
  const messages = useSelector((state: { messages: any }) => state.messages);
  const { loading: loadingQuery, data: dataQuery } = useQuery(MESSAGES_QUERY);
  const [play] = useSound(notificationSfx);
  const { onBlur } = useRetainUpdatedValue('onBlur');
  const { onContextMenu } = useContextMenu('context-menu');
  const dispatch = useDispatch();

  const { unreadMessages } = useSelector(
    (state: { unreadMessages: { unreadMessages: string[] } }) =>
      state.unreadMessages
  );
  const { author } = useSelector(
    (state: { author: { author: string } }) => state.author
  );

  useEffect(() => {
    if (!loadingQuery) dispatch(setMessages(dataQuery.messages.slice(-39)));
  }, [!loadingQuery]);

  useEffect(() => {
    const messagesList = document.querySelector('.messages-list');

    if (messagesList) {
      messagesList.scrollTop = messagesList.scrollHeight;
    }
  });

  useSubscription(MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageCreated;

      dispatch(
        setMessages([
          ...messages.messages.slice(-38),
          { id: message.id, ...message },
        ])
      );

      if (message.author !== author) {
        if (document.hidden && message.text.split(' ')[0] === `@${author}`) {
          play();
          dispatch(
            setUnreadMessages([
              ...unreadMessages.slice(-3),
              {
                text: `${
                  message.text.slice().length <= 53
                    ? message.text.split(`@${author}`).join('')
                    : `${message.text.split(`@${author}`).join('').slice(0, 52)
                    }...`
                }`,
                id: message.id,
              },
            ])
          );
        }
      }
    },
  });

  useSubscription(MESSAGES_UPDATED, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageUpdated;

      const array = messages.messages.slice(-38);
      const { id, text } = message;
      const result = [];

      for (let index = 0; index < array.length; index += 1) {
        result.push(
          array[index].id === id
            ? { ...array[index], text }
            : array[index]
        );
      }

      dispatch(
        setMessages([
          ...result
        ])
      );
    }
  });

  useSubscription(MESSAGES_REMOVED, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageRemoved;

      const array = messages.messages.slice(-39);

      dispatch(
        setMessages([
          ...array.filter((element: {id: string}) => element.id !== message.id)
        ])
      );
    }
  });

  function autoSize(event: { target: HTMLElement; }) {
    const element = event.target;

    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight - 4}px`;
  }

  const confirmWithEnter = (event: { key: string; target: { blur: () => void; }; }) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };

  return (
    <ul className="messages-list">
      {messages.messages.map(
        (res: { text: string; id: string; author: string, date: string }) => (
          <li
            key={res.id}
            className={`messages-list__message ${
              author === res.author ? 'me-author' : ''
            } ${editId === res.id ? 'edit' : ''}`}
            onContextMenu={
              (event) => (
                author === res.author
                  ? onContextMenu(event, setEditId, res.id)
                  : ''
              )
            }
            onTouchStart={
              (event) => (
                author === res.author
                  ? onContextMenu(event, setEditId, res.id)
                  : ''
              )
            }
          >
            <div className="messages-list__message-content">
              <p className="messages-list__author">{res.author}</p>
              {editId !== res.id
                ? <p className="messages-list__text">{res.text}</p>
                : (
                  <textarea
                    defaultValue={res.text}
                    className="messages-list__text"
                    rows={1}
                    onChange={autoSize}
                    onKeyDown={(event) => confirmWithEnter(event)}
                    onBlur={(event) => onBlur(event, res.id, setEditId)}
                  />
                )}
            </div>
            {res.date
              && <p className="messages-list__date">{formatDistanceToNow(new Date(res.date), { addSuffix: true })}</p>}
          </li>
        )
      )}
    </ul>
  );
}

export default MessagesList;
