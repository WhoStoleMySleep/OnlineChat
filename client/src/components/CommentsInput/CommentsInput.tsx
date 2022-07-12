import { gql, useMutation } from '@apollo/react-hoc';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from '../../redux/componentReducers/comments';
import './CommentsInput.scss';

const addMessageMutation = gql`
  mutation messageCreated($text: String!, $author: String!) {
    createMessage(text: $text, author: $author) {
      id
      text
      author
    }
  }
`;

const CommentsInput = () => {
  const [text, setText] = useState('');

  const comments = useSelector((state: { comments: any }) => state.comments);
  const dispatch = useDispatch();

  const genId = () => {
    const min = Math.ceil(0);
    const max = Math.floor(999999999);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;

    setText(targetValue);
  };

  const handleTarget = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text) {
      dispatch(
        setComments([...comments.comments, { text: text, id: genId() }])
      );
      setText('');
    }
  };

  return (
    <form
      action=""
      className="comments-input"
      onSubmit={(event) => handleTarget(event)}
    >
      <input
        type="text"
        value={text}
        onChange={(event) => handleInput(event)}
      />
      <input type="submit" hidden />
    </form>
  );
};

export default CommentsInput;
