import { BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css';

import EventWrapper from '../Event/EventWrapper'
import Login from '../Login/Login';
import useUser from './useUser';

function App() {
  const { userId, setUserId } = useUser();
  
  if (!userId) {
    return <Login setToken={setUserId} />
  }

  // todo: change this date to new Date() to return current time
  const currentTime = new Date('September 4, 2010 10:01:00')
  
  const event = {
    id: '2010-1',
    start: new Date('September 4, 2010 10:00 AM'),
    name: 'Pickem 2010: Week 1',
    maxUnits: 200
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/testv1/event">
          <div className="App">
            <div className='header'>
              <div className='site-name'>
                big12pickem.com
              </div>
              <div className='event-name'>
                {event.name}
              </div>
            </div>
            <EventWrapper event={event} currentTime={currentTime} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
