import { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loagind';

class Login extends Component {
  render() {
    const { isLoading, loginName, loggedIn } = this.props;
    const { handleChange, handleSubmit } = this.props;
    const minChars = 3;
    const isBtnValid = loginName.length >= minChars;
    const formPage = (
      <form action="">
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="loginName">
            <input
              type="text"
              name="loginName"
              value={ loginName }
              id="loginName"
              data-testid="login-name-input"
              onChange={ handleChange }
            />
          </label>
          <button
            disabled={ !isBtnValid }
            onClick={ handleSubmit }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </fieldset>
      </form>
    );
    return (
      <div data-testid="page-login">
        { loggedIn && <Redirect to="/search" /> }
        { isLoading ? <Loading /> : formPage }
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  loginName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
