import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useClassOpen from '../../hooks/useClassOpen/useClassOpen';
import useInputChange from '../../hooks/useInputChange/useInputChange';
import useSubmitAuthor from '../../hooks/useSubmitAuthor/useSubmitAuthor';
import { setAuthor } from '../../redux/reducers/login';
import styles from './LogIn.module.scss';

function LogIn() {
  const getLocalStorageAuthor = localStorage.getItem('author');
  const dispatch = useDispatch();

  const { onChange: onInputChange, text } = useInputChange(
    getLocalStorageAuthor || ''
  );
  const { onClick: onFromOpen } = useClassOpen(
    styles['log-in__form'],
    styles.open
  );
  const { onSubmit: onFormSubmit } = useSubmitAuthor(
    'onSubmit',
    styles['log-in__form'],
    styles.open,
    text,
    setAuthor
  );

  useEffect(() => {
    dispatch(setAuthor(text));
  }, []);

  return (
    <div className={styles['log-in']}>
      <button
        type="button"
        className={styles['log-in__open-form']}
        onClick={onFromOpen}
        data-testid="login-open-button"
      >
        Log-In
      </button>
      <form
        action=""
        className={styles['log-in__form']}
        onSubmit={onFormSubmit}
        data-testid="login-form"
      >
        <input
          type="text"
          className={styles['log-in__author']}
          placeholder="Enter your nickname"
          maxLength={25}
          value={text}
          onChange={onInputChange}
          data-testid="login-name-input"
        />
        <br />
        <button
          type="submit"
          className={styles['log-in__close-form']}
          data-testid="login-submit-button"
        >
          Сonfirm
        </button>
      </form>
    </div>
  );
}

export default LogIn;
