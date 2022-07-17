import { gql, useQuery, useSubscription } from '@apollo/react-hoc';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import notificationSfx from '../../assets/sounds/notification.mp3';
import { setMessages } from '../../redux/componentReducers/messages';
import { setUnreadMessages } from '../../redux/componentReducers/unreadMessages';
import './MessagesList.scss';

const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageCreated {
    messageCreated {
      text
      author
    }
  }
`;

const MESSAGES_QUERY = gql`
  query Messages {
    messages {
      id
      text
      author
    }
  }
`;

function MessagesList() {
  const messages = useSelector((state: { messages: any }) => state.messages);
  const { unreadMessages } = useSelector(
    (state: { unreadMessages: { unreadMessages: string[] } }) =>
      state.unreadMessages
  );
  const { author } = useSelector(
    (state: { author: { author: string } }) => state.author
  );
  const dispatch = useDispatch();

  const idGen = () => {
    const min = Math.ceil(0);
    const max = Math.floor(999999999);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const { loading: loadingQuery, data: dataQuery } = useQuery(MESSAGES_QUERY);

  useEffect(() => {
    if (!loadingQuery) dispatch(setMessages(dataQuery.messages.slice(-39)));
  }, [!loadingQuery]);

  const [play] = useSound(notificationSfx);

  useSubscription(MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageCreated;

      dispatch(
        setMessages([
          ...messages.messages.slice(-38),
          { id: idGen(), ...message },
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
                id: idGen(),
              },
            ])
          );
        }
      }
    },
  });

  useEffect(() => {
    const messagesList = document.querySelector('.messages-list');

    if (messagesList) {
      messagesList.scrollTop = messagesList.scrollHeight;
    }
  });

  return (
    <ul className="messages-list">
      {messages.messages.map(
        (res: { text: string; id: number; author: string }) => (
          <li
            key={res.id}
            className={`messages-list__message ${
              author === res.author ? 'me-author' : ''
            }`}
          >
            <p className="messages-list__author">{res.author}</p>
            <p className="messages-list__text">{res.text}</p>
          </li>
        )
      )}
    </ul>
  );
}

export default MessagesList;
