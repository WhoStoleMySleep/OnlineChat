import CommentsInput from '../CommentsInput/CommentsInput';
import CommentsList from '../CommentsList/CommentsList';
import './Comments.scss';

const Comments = () => {
  return (
    <div className="comments">
      <CommentsList />
      <CommentsInput />
    </div>
  );
};

export default Comments;
