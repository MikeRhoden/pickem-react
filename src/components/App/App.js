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
  const utcStart = new Date('6/5/2021 4:00:00 PM')
  const localStart = new Date( utcStart.getTime() - (utcStart.getTimezoneOffset() * 60000));
  const event = {
    id: '2021-100',
    start: localStart,
    name: 'College Football Pickem 2021 Week 100	',
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
            <EventWrapper event={event} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
