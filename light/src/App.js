import './App.css';
import TrafficLight from './TrafficLight/TrafficLight';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');


function App() {


  const handleEmit = () => {
    socket.emit('current_location', { lat: 50.4501, lng: 30.5234 });
    // socket.emit('current_location', { id: socket.id ,lat: 21.258661, lng: -99.759626 });
  }
  
  return (
    <div className="App">
      <TrafficLight socket={socket}/>
      {/* <button onClick={handleEmit}>Turn Light to Green</button> */}
    </div>
  );
}

export default App;
