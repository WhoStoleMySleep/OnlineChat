import React from 'react';
import styles from './ContextMenu.module.scss';

function ContextMenu() {
  return (
    <nav className={styles['context-menu']}>
      <ul className={styles['context-menu__item-list']}>
        <li className={styles['context-menu__item']}>
          <a href="##" className={styles['context-menu__link']}>
            <i className={styles['fa-pencil']} />
            Edit
          </a>
        </li>
        <li className={styles['context-menu__item']}>
          <a href="##" className={styles['context-menu__link']}>
            <i className={styles['fa-times']} />
            Delete
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default ContextMenu;
