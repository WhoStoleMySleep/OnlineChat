import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useClassOpen from '../../hooks/useClassOpen/useClassOpen';
import useInputChange from '../../hooks/useInputChange/useInputChange';
import useSubmitAuthor from '../../hooks/useSubmitAuthor/useSubmitAuthor';
import { setAuthor } from '../../redux/componentReducers/login';
import './LogIn.scss';

function LogIn() {
  const getLocalStorageAuthor = localStorage.getItem('author');
  const dispatch = useDispatch();

  const { onClick: onFromOpen } = useClassOpen('log-in__form', 'open');
  const { onChange: onInputChange, text } = useInputChange(getLocalStorageAuthor || '');
  const { onSubmit: onFormSubmit } = useSubmitAuthor('onSubmit', 'log-in__form', 'open', text, setAuthor);
  const { onClick: onSubmitButtonClick } = useSubmitAuthor('onClick', 'log-in__form', 'open', text, setAuthor);

  useEffect(() => {
    dispatch(setAuthor(text));
  }, []);

  return (
    <div className="log-in">
      <button
        type="button"
        className="log-in__open-form"
        onClick={onFromOpen}
        data-testid="login-open-button"
      >
        Log-In
      </button>
      <form
        action=""
        className="log-in__form"
        onSubmit={onFormSubmit}
        data-testid="login-form"
      >
        <input
          type="text"
          className="log-in__author"
          placeholder="Enter your nickname"
          maxLength={25}
          value={text}
          onChange={onInputChange}
          data-testid="login-name-input"
        />
        <br />
        <button
          type="button"
          className="log-in__close-form"
          onClick={onSubmitButtonClick}
          data-testid="login-submit-button"
        >
          Сonfirm
        </button>
      </form>
    </div>
  );
}

export default LogIn;
