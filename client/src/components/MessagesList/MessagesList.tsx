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
  const dispatch = useDispatch();

  const idGen = () => {
    const min = Math.ceil(0);
    const max = Math.floor(999999999);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const { loading: loadingQuery, data: dataQuery } = useQuery(MESSAGES_QUERY);

  useEffect(() => {
    if (!loadingQuery) dispatch(setMessages(dataQuery.messages));
  }, [!loadingQuery]);

  const { loading, data } = useSubscription(MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageCreated;

      dispatch(
        setMessages([...messages.messages, { id: idGen(), ...message }])
      );
    },
  });

  return (
    <ul className="messages-list">
    </ul>
  );
};

export default MessagesList;
