import { BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css';

import EventWrapper from '../Event/EventWrapper'
import Login from '../Login/Login';
import useUser from './useUser';
import { useState } from 'react';
import FetchActiveEventWrapper from './FetchActiveEventWrapper'


function App() {
  const { userId, setUserId } = useUser();
  const [ event, setEvent ] = useState({id: ''});
  if (!userId) {
    return <Login setToken={setUserId} />
  }
  const isEventActive = (event.id !== '')

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
            {isEventActive && <EventWrapper event={event} userId={userId} />}
            {<FetchActiveEventWrapper setEvent={setEvent} />}
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
