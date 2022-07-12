import { gql, useQuery, useSubscription } from '@apollo/react-hoc';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from '../../redux/componentReducers/comments';
import './CommentsList.scss';

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

const CommentsList = () => {
  const comments = useSelector((state: { comments: any }) => state.comments);
  const dispatch = useDispatch();

  const idGen = () => {
    const min = Math.ceil(0);
    const max = Math.floor(999999999);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const { loading: loadingQuery, data: dataQuery } = useQuery(MESSAGES_QUERY);

  useEffect(() => {
    if (!loadingQuery) dispatch(setComments(dataQuery.messages));
  }, [!loadingQuery]);

  const { loading, data } = useSubscription(MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageCreated;

      dispatch(
        setComments([...comments.comments, { id: idGen(), ...message }])
      );
    },
  });

  return (
    <ul className="comments-list">
      {comments.comments.map((res: { text: string; id: number }) => (
        <li key={res.id}>{res.text}</li>
      ))}
    </ul>
  );
};

export default CommentsList;
