import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loadind';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      loggedUser: {},
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const loggedUser = await getUser();
    this.setState({
      isLoading: false,
      loggedUser,
    });
  }

  render() {
    const { isLoading, loggedUser } = this.state;
    const { name, email, image, description } = loggedUser;
    const renderProfile = (
      <>
        <h1><strong>Profile</strong></h1>
        <img
          src={ image }
          alt={ name }
          data-testid="profile-image"
        />
        <div className="profile-information">
          <h2><strong>Nome</strong></h2>
          <p>{ name }</p>
        </div>
        <div className="profile-information">
          <h2><strong>Email</strong></h2>
          <p>{ email }</p>
        </div>
        <div className="profile-information">
          <h2><strong>Descrição</strong></h2>
          <p>{ description }</p>
        </div>
        <Link to="/profile/edit">Editar perfil</Link>
      </>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : renderProfile }
      </div>
    );
  }
}

export default Profile;
