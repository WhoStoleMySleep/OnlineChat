import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from '../../redux/componentReducers/comments';
import './CommentsList.scss';
const CommentsList = () => {
  const comments = useSelector((state: { comments: any }) => state.comments);
  const { loading: loadingQuery, data: dataQuery } = useQuery(MESSAGES_QUERY);
  useEffect(() => {
    if (!loadingQuery) dispatch(setComments(dataQuery.messages));
  }, [!loadingQuery]);

  return (
    <ul className="comments-list">
      {comments.comments.map((res: { text: string; id: number }) => (
        <li key={res.id}>{res.text}</li>
      ))}
    </ul>
  );
};

export default CommentsList;
