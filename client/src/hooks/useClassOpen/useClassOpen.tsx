function useClassOpen(elementAddClassName: string, openClassName: string) {
  if (elementAddClassName && openClassName) {
    return {
      onClick: () => {
        const element = document.querySelector(`.${elementAddClassName}`);

        if (element) {
          element.classList.add(openClassName);
        }
      }
    };
  }

  return { onClick: () => 'No data entered' };
}

export default useClassOpen;
