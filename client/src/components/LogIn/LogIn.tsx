import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthor } from '../../redux/componentReducers/login';
import './LogIn.scss';

const LogIn = () => {
  const getLocalStorageAuthor = localStorage.getItem('author');

  const [authorState, setAuthorState] = useState(
    getLocalStorageAuthor ? getLocalStorageAuthor : ''
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthor(authorState));
  }, []);

  const onFromOpen = () => {
    const form = document.querySelector('.log-in__form');

    if (form) {
      form.classList.add('open');
    }
  };

  const onFormSubmit = (event?: any) => {
    event?.preventDefault();
    const form = document.querySelector('.log-in__form');

    if (form && authorState) {
      form?.classList.remove('open');
      localStorage.setItem('author', authorState);
      dispatch(setAuthor(authorState));
    }
  };

  const onInputChange = (event: any) => {
    setAuthorState(event.target.value);
  };

  return (
    <div className="log-in">
      <button type="button" className="log-in__open-form" onClick={onFromOpen}>
        Log-In
      </button>
      <form action="" className="log-in__form" onSubmit={onFormSubmit}>
        <input
          type="text"
          className="log-in__author"
          placeholder="Enter your nickname"
          maxLength={25}
          value={authorState}
          onChange={(event) => onInputChange(event)}
        />
        <br />
        <button
          type="button"
          className="log-in__close-form"
          onClick={onFormSubmit}
        >
          Сonfirm
        </button>
      </form>
    </div>
  );
};

export default LogIn;
