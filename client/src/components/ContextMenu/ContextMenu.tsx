import React from 'react';
import './ContextMenu.scss';

function ContextMenu() {
  return (
    <nav className="context-menu">
      <ul className="context-menu__item-list">
        <li className="context-menu__item">
          <a href="##" className="context-menu__link">
            <i className="fa-pencil" />
            Edit
          </a>
        </li>
        {/* <li className="context-menu__item">
          <a href="##" className="context-menu__link">
            <i className="fa-times" />
            Delete
          </a>
        </li> */}
      </ul>
    </nav>
  );
}

export default ContextMenu;
