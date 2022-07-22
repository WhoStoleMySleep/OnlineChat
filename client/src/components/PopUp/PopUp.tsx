import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUnreadMessages } from '../../redux/componentReducers/unreadMessages';
import './PopUp.scss';

function PopUp(props: { headed: string }) {
  const { headed } = props;

  const dispatch = useDispatch();
  const { unreadMessages } = useSelector(
    (state: { unreadMessages: { unreadMessages: any } }) => state.unreadMessages
  );

  const onPopUpClose = (): void => {
    const PopUpElement: HTMLDivElement | null = document.querySelector('.pop-up');

    if (PopUpElement && unreadMessages.length) {
      PopUpElement.classList.add('hidden');
      dispatch(setUnreadMessages([]));
    }
  };

  return (
    <div className={`pop-up ${unreadMessages.length ? '' : 'hidden'}`}>
      <button type="button" className="pop-up__close" onClick={onPopUpClose}>
        &#215;
      </button>
      <h2 className="pop-up__headed">{headed}</h2>
      <ol className="pop-up__list">
        {unreadMessages.length
          && unreadMessages.map((res: { text: string; id: string }) => (
            <li className="pop-up__item" key={res.id}>
              {res.text}
            </li>
          ))}
      </ol>
    </div>
  );
}

export default PopUp;
