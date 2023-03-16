import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loadind';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loadingUser: false,
      user: {},
    };
  }

  async componentDidMount() {
    this.setState({
      loadingUser: true,
    });
    const user = await getUser();
    this.setState({
      user,
      loadingUser: false,
    });
  }

  render() {
    const { loadingUser, user: { name } } = this.state;
    const headerComponent = (
      <>
        <div data-testid="header-user-name">{ name }</div>
        <div>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            <strong>Search</strong>
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            <strong>Favotites</strong>
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            <strong>Profile</strong>
          </Link>
        </div>
      </>
    );
    return (
      <header data-testid="header-component">
        { loadingUser ? <Loading /> : headerComponent }
      </header>
    );
  }
}

export default Header;
