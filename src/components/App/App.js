import { BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css';

import Event from '../Event/Event'
import Login from '../Login/Login';
import useUser from './useUser';

function App() {
  const { userId, setUserId } = useUser();
  
  if (!userId) {
    return <Login setToken={setUserId} />
  }

  const event = {
    id: 1,
    start: new Date('September 6, 2020 11:00:00'),
    name: 'Pickem 2020: Week 1',
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
            <Event event={event} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
