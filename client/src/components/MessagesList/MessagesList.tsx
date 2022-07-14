import { gql, useQuery, useSubscription } from '@apollo/react-hoc';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../redux/componentReducers/messages';
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

const MessagesList = () => {
  const messages = useSelector((state: { messages: any }) => state.messages);
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

  const { loading, data } = useSubscription(MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageCreated;

      dispatch(
        setMessages([
          ...messages.messages.slice(-38),
          { id: idGen(), ...message },
        ])
      );
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
};

export default MessagesList;
