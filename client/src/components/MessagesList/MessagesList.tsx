import { useQuery, useSubscription } from '@apollo/react-hoc';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import notificationSfx from '../../assets/sounds/notification.mp3';
import {
  MESSAGES_QUERY, MESSAGES_REMOVED, MESSAGES_SUBSCRIPTION, MESSAGES_UPDATED
} from '../../GraphQl.queries';
import { setMessages } from '../../redux/componentReducers/messages';
import { setUnreadMessages } from '../../redux/componentReducers/unreadMessages';
import Message from '../Message/Message';
import styles from './MessagesList.module.scss';

function MessagesList() {
  const [play] = useSound(notificationSfx);
  const dispatch = useDispatch();

  const {
    loading: loadingQuery,
    data: dataQuery
  } = useQuery(MESSAGES_QUERY);

  const messages = useSelector(
    (state: { messages: any; }) => state.messages
  );
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
    const messagesList = document.querySelector(`.${styles['messages-list']}`);

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

  return (
    <ul className={styles['messages-list']}>
      {messages.messages.map(
        (res: { text: string; id: string; author: string, date: string }) => (
          <Message
            key={res.id}
            id={res.id}
            MeAuthor={author}
            receivedAuthor={res.author}
            text={res.text}
            date={res.date}
          />
        )
      )}
    </ul>
  );
}

export default MessagesList;
