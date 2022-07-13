import './LogIn.scss';

const LogIn = () => {
  const onFromHandle = () => {
    const form = document.querySelector('.log-in__form');

    if (form) {
      form.classList.toggle('open');
    }
  };

  return (
    <div className="log-in">
      <button
        type="button"
        className="log-in__open-form"
        onClick={onFromHandle}
      >
        Log-In
      </button>
      <form action="" className="log-in__form">
        <input
          type="text"
          className="log-in__author"
          placeholder="Enter your nickname"
        />
        <br />
        <button
          type="button"
          className="log-in__close-form"
          onClick={onFromHandle}
        >
          Сonfirm
        </button>
      </form>
    </div>
  );
};

export default LogIn;
