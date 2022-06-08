import './App.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');


function App() {
  const handleEmit = () => {
    socket.emit('message', 'Hello from client');
  }

  return (
    <div className="App">
      <div>Hello react</div>
      <button onClick={handleEmit}>Emit socket.io event</button>
    </div>
  );
}

export default App;
