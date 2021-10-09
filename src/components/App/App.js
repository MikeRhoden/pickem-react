import { BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css'

import EventWrapper from '../Event/EventWrapper'
import Login from '../Login/Login'
import useUser from './useUser'
import { useState } from 'react'
import FetchActiveEventWrapper from './FetchActiveEventWrapper'
import Menu1 from './Menu'
import Dashboard from '../Dashboard/Dashboard'

function App() {
  const { userId, setUserId, clearUserId } = useUser();
  const [ event, setEvent ] = useState({id: ''});
  let page = ''

  if (!userId) {
    return <Login setToken={setUserId} />
  }
  const isEventActive = (event.id !== '')

  if (window.location.href.indexOf('dashboard') > -1)
    page = 'dashboard'
  else if (window.location.href.indexOf('event') > -1)
    page = 'event'

  return (
    <div>
      <Menu1 signOut={clearUserId} activePage={page} />
      <BrowserRouter>
        <Switch>
          <Route path="/event">
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
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
