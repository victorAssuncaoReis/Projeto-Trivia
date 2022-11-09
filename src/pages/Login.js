import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
// import PropTypes from 'prop-types';

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

  // handleClick = () => {
  //   const { email } = this.state;
  //   const { dispatch, history } = this.props;
  //   dispatch(validname(email));
  //   history.push('/carteira');
  // };

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <div>
        <section>
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
            handleClick={ this.handleClick }
            disabled={ isDisabled }
            btnName="Jogar"
            dataName="btn-play"
          />
        </section>

      </div>
    );
  }
}

// Login.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   history: PropTypes.shape().isRequired,
// };

export default connect(null)(Login);
