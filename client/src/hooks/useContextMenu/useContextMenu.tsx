import { gql, useMutation } from '@apollo/react-hoc';
import React from 'react';

const MESSAGE_UPDATE = gql`
  mutation($id: ID!) {
    removeMessage(id: $id)
  }
`;

function useContextMenu(contextMenuClass: string) {
  if (contextMenuClass) {
    type ctxMenuType = HTMLLIElement | null
    const contextMenu: ctxMenuType = document.querySelector(`.${contextMenuClass}`);
    const [removeMessage] = useMutation(MESSAGE_UPDATE);

    document.addEventListener('click', (event) => {
      const element = event.target;

      const contextMenuRemove = (
        contextMenu
        && contextMenu.classList.contains('active')
        && element
        && (element as HTMLElement).className !== 'messages-list__message me-author'
      );

      if (contextMenuRemove) {
        contextMenu.classList.remove('active');
      }
    });

    return {
      onContextMenu: (
        event:
          React.MouseEvent<HTMLLIElement, MouseEvent>
          | React.TouchEvent<HTMLLIElement>,
        // eslint-disable-next-line no-unused-vars
        setState: (arg0: string) => void,
        id: string
      ) => {
        if ('pageY' in event) event.preventDefault();

        const element = event.target;
        const mouseY = 'pageY' in event ? event.pageY : event.touches[0].pageY;
        const mouseX = 'pageX' in event ? event.pageX : event.touches[0].pageX;
        const screenWidth = window.screen.width;
        const contextMenuWidth = contextMenu?.offsetWidth;

        const contextMenuCheck = (
          contextMenu
          && element
          && !(element as HTMLElement).classList.contains('edit')
          && (element as HTMLElement).tagName !== 'TEXTAREA'
          && contextMenuWidth
        );

        if (contextMenuCheck && mouseX + contextMenuWidth < screenWidth) {
          contextMenu.classList.add('active');
          contextMenu.classList.remove('reversed');
          contextMenu.style.top = `${mouseY}px`;
          contextMenu.style.left = `${mouseX}px`;
        } else if (contextMenuCheck && contextMenuWidth) {
          contextMenu.classList.add('active', 'reversed');

          contextMenu.style.top = `${mouseY}px`;
          contextMenu.style.left = `${mouseX - contextMenuWidth}px`;
        }

        const contextItem = document.querySelectorAll('.context-menu__item');

        contextItem[0].addEventListener('click', () => {
          setTimeout(() => {
            const textArea = ((element as HTMLElement)?.childNodes[1] as HTMLTextAreaElement);

            textArea.focus();

            const textElementCheck = (
              textArea
              && textArea.tagName === 'TEXTAREA'
              && textArea.scrollTop <= 27
            );

            if (textElementCheck) {
              textArea.style.height = `
                ${textArea.scrollHeight - 4}px
              `;
            }
          }, 0);

          setState(id);
        });

        contextItem[1].addEventListener('click', () => {
          removeMessage({
            variables: {
              id
            }
          });
        });
      }
    };
  }

  return { onContextMenu: () => '' };
}

export default useContextMenu;
