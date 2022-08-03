import React from 'react';

function useContextMenu(contextMenuClass: string) {
  if (contextMenuClass) {
    type ctxMenuType = HTMLLIElement | null
    const contextMenu: ctxMenuType = document.querySelector(`.${contextMenuClass}`);

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
        event.preventDefault();

        const element: EventTarget | null = event.target;
        const mouseX = 'pageX' in event ? event.pageX : event.touches[0].pageX;
        const mouseY = 'pageY' in event ? event.pageY : event.touches[0].pageY;

        const contextMenuCheck = (
          contextMenu
          && element
          && !(element as HTMLElement).classList.contains('edit')
          && (element as HTMLElement).tagName !== 'TEXTAREA'
        );

        if (contextMenuCheck) {
          contextMenu.classList.add('active');
          contextMenu.style.top = `${mouseX}px`;
          contextMenu.style.left = `${mouseY}px`;
        }

        const contextItem = document.querySelectorAll('.context-menu__item');

        contextItem[0].addEventListener('click', () => {
          setTimeout(() => {
            ((element as HTMLElement)?.childNodes[1] as HTMLTextAreaElement).focus();
          }, 0);

          setState(id);
        });
      }
    };
  }

  return { onContextMenu: () => '' };
}

export default useContextMenu;
