import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>
          TrybeTunes
        </p>
        <BrowserRouter>
          <Switch>
            <Route
              path="/profile/edit"
              render={ (props) => { <ProfileEdit { ...props } />; } }
            />
            <Route
              path="/profile"
              render={ (props) => { <Profile { ...props } />; } }
            />
            <Route
              path="/album/:id"
              render={ (props) => { <Album { ...props } />; } }
            />
            <Route
              path="/search"
              render={ (props) => { <Search { ...props } />; } }
            />
            <Route
              path="/favorites"
              render={ (props) => { <Favorites { ...props } />; } }
            />
            <Route
              exact
              path="/"
              render={ (props) => { <Login { ...props } />; } }
            />
            <Route
              path="*"
              render={ (props) => { <NotFound { ...props } />; } }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
