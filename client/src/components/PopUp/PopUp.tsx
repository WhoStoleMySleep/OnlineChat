import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import useClassHidden from '../../hooks/useClosePopUp/useClosePopUp';
import { setUnreadMessages } from '../../redux/reducers/unreadMessages';
import styles from './PopUp.module.scss';

function PopUp(props: { headed: string }) {
  const { headed } = props;

  const { unreadMessages } = useSelector(
    (state: { unreadMessages: { unreadMessages: any; }; }) =>
      state.unreadMessages
  );

  const { onClick: onPopUpClose } = useClassHidden(
    styles['pop-up'],
    styles.hidden,
    setUnreadMessages
  );

  return (
    <div
      className={classNames(styles['pop-up'], {
        [styles.hidden]: unreadMessages.length
      })}
      data-testid="popUp"
    >
      <button
        type="button"
        className={styles['pop-up__close']}
        onClick={onPopUpClose}
      >
        &#215;
      </button>
      <h2 className={styles['pop-up__headed']}>{headed}</h2>
      <ol className={styles['pop-up__list']}>
        {unreadMessages.length
          && unreadMessages.map((res: { text: string; id: string }) => (
            <li className={styles['pop-up__item']} key={res.id}>
              {res.text}
            </li>
          ))}
      </ol>
    </div>
  );
}

export default PopUp;
