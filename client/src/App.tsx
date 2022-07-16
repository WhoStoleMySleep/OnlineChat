import './App.scss';
import Messages from './components/Messages/Messages';
import LogIn from './components/LogIn/LogIn';
import PopUp from './components/PopUp/PopUp';

function App() {
  return (
    <div className="App">
      <LogIn />
      <Messages />
    </div>
  );
}

export default App;
