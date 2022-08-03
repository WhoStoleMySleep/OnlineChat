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
        const mouseY = 'pageY' in event ? event.pageY : event.touches[0].pageY;
        const mouseX = 'pageX' in event ? event.pageX : event.touches[0].pageX;

        const contextMenuCheck = (
          contextMenu
          && element
          && !(element as HTMLElement).classList.contains('edit')
          && (element as HTMLElement).tagName !== 'TEXTAREA'
        );

        if (contextMenuCheck) {
          contextMenu.classList.add('active');
          contextMenu.style.top = `${mouseY}px`;
          contextMenu.style.left = `${mouseX}px`;
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
      }
    };
  }

  return { onContextMenu: () => '' };
}

export default useContextMenu;
