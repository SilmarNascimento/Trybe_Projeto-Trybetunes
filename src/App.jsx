import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: 'false',
      loginName: '',
    };
  }

  handleSubmit = async () => {
    const { loginName } = this.state;
    this.setState({
      isLoading: 'true',
    });
    await createUser({ name: loginName });
    this.setState({
      isLoading: 'false',
    });
  };

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { isLoading, loginName } = this.state;
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
              render={ (props) => {
                <Login
                  { ...props }
                  loading={ isLoading }
                  loginName={ loginName }
                  handleClick={ this.handleChange }
                  handleSubmit={ this.handleSubmit }
                />;
              } }
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
