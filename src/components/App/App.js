import './App.css';
import Event from '../Event/Event'
function App() {
  const event = {
    id: 1,
    start: new Date('September 6, 2020 11:00:00'),
    name: 'Pickem 2020: Week 1',
    maxUnits: 200
  }
  return (
    <div className="App">
      <div className='header'>
        <div className='site-name'>
          big12pickem.com
        </div>
        <div className='event-name'>
          {event.name}
        </div>
      </div>
      <Event event={event} />
    </div>
  );
}

export default App;
