import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loadind';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      editName: '',
      editEmail: '',
      editImage: '',
      editDescription: '',
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const { name, email, image, description } = await getUser();
    this.setState({
      isLoading: false,
      editName: name,
      editEmail: email,
      editImage: image,
      editDescription: description,
    });
  }

  handleUpdate = async () => {
    const { editName, editEmail, editImage, editDescription } = this.state;
    const { history } = this.props;
    const userUpdated = {
      name: editName,
      email: editEmail,
      image: editImage,
      description: editDescription,
    };
    this.setState({
      isLoading: true,
    });
    await updateUser(userUpdated);
    this.setState({
      isLoading: false,
      editName,
      editEmail,
      editImage,
      editDescription,
    });
    history.push('/profile');
  };

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { isLoading, editName, editEmail, editDescription, editImage } = this.state;
    const { handleChange, handleUpdate } = this;
    const isValid = editName && editEmail && editDescription && editImage;
    const renderProfileEdit = (
      <form action="">
        <fieldset>
          <legend>Editar Perfil</legend>
          <label htmlFor="editName">
            Nome
            <input
              type="text"
              name="editName"
              id="editName"
              value={ editName }
              onChange={ handleChange }
              data-testid="edit-input-name"
            />
          </label>
          <label htmlFor="editEmail">
            Email
            <input
              type="email"
              name="editEmail"
              id="editEmail"
              value={ editEmail }
              onChange={ handleChange }
              data-testid="edit-input-email"
            />
          </label>
          <label htmlFor="editDdescription">
            Descrição
            <textarea
              name="editDescription"
              id="editDescription"
              value={ editDescription }
              cols="30"
              rows="10"
              onChange={ handleChange }
              data-testid="edit-input-description"
            />
          </label>
          <label htmlFor="editImage">
            <input
              type="text"
              name="editImage"
              id="editimage"
              value={ editImage }
              onChange={ handleChange }
              data-testid="edit-input-image"
            />
          </label>
          <button
            disabled={ !isValid }
            onClick={ handleUpdate }
            data-testid="edit-button-save"
          >
            Salvar
          </button>
        </fieldset>
      </form>
    );
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading /> : renderProfileEdit }
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
