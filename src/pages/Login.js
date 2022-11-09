import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  validEmail = () => {
    const { email } = this.state;
    const regexValidation = /\S+@\S+\.\S+/;

    return regexValidation.test(email);
  };

  validateEntry = () => {
    const { name } = this.state;

    if (this.validEmail() && name.length > 0) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validateEntry());
  };

  handleClick = () => {
    const { history } = this.props;

    history.push('/settings');
  };

  render() {
    const { email, name, isDisabled } = this.state;

    return (
      <section>
        <Button
          handleClick={ this.handleClick }
          btnName="Configurações"
          dataName="btn-settings"
        />
        <input
          type="email"
          name="email"
          onChange={ this.handleChange }
          placeholder="Qual é o seu e-mail do Gravatar?"
          data-testid="input-gravatar-email"
          value={ email }
        />
        <input
          type="name"
          name="name"
          onChange={ this.handleChange }
          placeholder="Qual é o seu nome?"
          data-testid="input-player-name"
          value={ name }
        />
        <Button
          disabled={ isDisabled }
          btnName="Jogar"
          dataName="btn-play"
        />
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect()(Login);
