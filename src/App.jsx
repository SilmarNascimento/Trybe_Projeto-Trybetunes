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
      isLoading: false,
      loginName: '',
      loggedIn: false,
    };
  }

  handleSubmit = async () => {
    const { loginName } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: loginName });
    this.setState({
      isLoading: false,
      loggedIn: true,
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
    const { isLoading, loginName, loggedIn } = this.state;
    const { handleChange, handleSubmit } = this;
    const loginProps = {
      isLoading,
      loginName,
      loggedIn,
      handleChange,
      handleSubmit,
    };
    const profileProps = {
      isLoading,
    };
    const profileEditProps = {
      isLoading,
    };
    const AlbumProps = {
      isLoading,
    };
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/profile/edit"
            render={ () => <ProfileEdit { ...profileEditProps } /> }
          />
          <Route
            path="/profile"
            render={ () => <Profile { ...profileProps } /> }
          />
          <Route
            path="/album/:id"
            render={ (props) => <Album { ...props } { ...AlbumProps } /> }
          />
          <Route
            path="/search"
            render={ () => <Search isLoading={ isLoading } /> }
          />
          <Route
            path="/favorites"
            render={ () => <Favorites isLoading={ isLoading } /> }
          />
          <Route exact path="/" render={ () => <Login { ...loginProps } /> } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
