import Push from 'push.js';

function usePush(pushTitle: string, pushMessage: string) {
  Push.create(pushTitle, {
    body: pushMessage,
    timeout: 5000,
    onClick() {
      window.focus();
    }
  });
}

export default usePush;
