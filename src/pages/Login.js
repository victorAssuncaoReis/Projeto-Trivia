import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import { saveLogin } from '../redux/actions';
import LogoTrivia from '../images/LogoTrivia.png';
import LogoTrybe from '../images/LogoTrybe.png';
import './Login.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  validateEntry = () => {
    const { name, email } = this.state;
    const regexValidation = /\S+@\S+\.\S+/;
    const checkEmail = regexValidation.test(email);
    if (checkEmail && name.length > 0) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateEntry());
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleClickGame = async () => {
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    dispatch(saveLogin({ name, email }));
    try {
      const url = 'https://opentdb.com/api_token.php?command=request';
      const response = await fetch(url);
      const data = await response.json();
      const token = await data.token;
      localStorage.setItem('token', token);
      history.push('/game');
    } catch (error) {
      return error;
    }
  };

  render() {
    const { email, name, isDisabled } = this.state;

    return (
      <section className="sec-login">
        <div className="div-login">
          <img className="logo-login" src={ LogoTrivia } alt="logo trivia" />
          <div className="container-login">
            <input
              className="input-email"
              type="email"
              name="email"
              onChange={ this.handleChange }
              placeholder="Qual é o seu e-mail do Gravatar?"
              data-testid="input-gravatar-email"
              value={ email }
            />
            <input
              className="input-name"
              type="name"
              name="name"
              onChange={ this.handleChange }
              placeholder="Qual é o seu nome?"
              data-testid="input-player-name"
              value={ name }
            />
            <Button
              btnClass="play"
              disabled={ isDisabled }
              btnName="Jogar"
              dataName="btn-play"
              handleClick={ this.handleClickGame }
            />
            <Button
              btnClass="settings"
              btnName="Configurações"
              dataName="btn-settings"
              handleClick={ this.handleClickSettings }
            />
          </div>
          <img className="logo-trybe-login" src={ LogoTrybe } alt="logo da trybe" />
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
