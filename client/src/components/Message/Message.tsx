import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import classNames from 'classnames';
import useContextMenu from '../../hooks/useContextMenu/useContextMenu';
import useRetainUpdatedValue from '../../hooks/useRetainUpdatedValue/useRetainUpdatedValue';
import contextMenuStyles from '../ContextMenu/ContextMenu.module.scss';
import styles from './Message.module.scss';

function Message(
  props: {
    id: string,
    MeAuthor: string,
    receivedAuthor: string,
    text: string,
    date: string
  }
) {
  const {
    id, MeAuthor, receivedAuthor, text, date
  } = props;

  const [editId, setEditId] = useState('');

  const { onBlur } = useRetainUpdatedValue('onBlur');
  const { onContextMenu } = useContextMenu(
    contextMenuStyles['context-menu'],
    contextMenuStyles.active,
    contextMenuStyles.reversed,
  );

  function autoSize(event: { target: HTMLElement; }) {
    const element = event.target;

    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight - 4}px`;
  }

  const confirmWithEnter = (event: { key: string; target: { blur: () => void; }; }) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };

  return (
    <li
      data-testid="Message"
      className={classNames(styles.message, {
        [styles['me-author']]: MeAuthor === receivedAuthor,
        [styles.edit]: editId === id
      })}
      onContextMenu={
        (event) => (
          MeAuthor === receivedAuthor
            ? onContextMenu(event, setEditId, id)
            : null
        )
      }
      onTouchStart={
        (event) => (
          MeAuthor === receivedAuthor
            ? onContextMenu(event, setEditId, id)
            : null
        )
      }
    >
      <div className={styles.message__content}>
        <p className={styles.message__author}>{receivedAuthor}</p>
        {editId !== id
          ? <p className={styles.message__text}>{text}</p>
          : (
            <textarea
              defaultValue={text}
              className={styles.message__text}
              onChange={autoSize}
              onKeyDown={(event) => confirmWithEnter(event)}
              onBlur={(event) => onBlur(event, id, setEditId)}
            />
          )}
      </div>
      {date
        && (
        <p className={styles.message__date}>
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </p>
        )}
    </li>
  );
}

export default Message;
