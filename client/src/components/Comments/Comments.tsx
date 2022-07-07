import { useSelector } from 'react-redux';
import CommentsInput from '../CommentsInput/CommentsInput';
import './Comments.scss';

const Comments = () => {
  const comments = useSelector((state: { comments: any }) => state.comments);

  return (
    <div className="comments">
      <ul className="comments__list">
        {comments.comments.map((res: { text: string; id: number }) => (
          <li key={res.id}>{res.text}</li>
        ))}
      </ul>
      <CommentsInput />
    </div>
  );
};

export default Comments;
