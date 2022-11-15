import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    formatedEmail: '',
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const formating = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ formatedEmail: formating });
  }

  render() {
    const { name, score } = this.props;
    const { formatedEmail } = this.state;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ formatedEmail }
          alt="user gravatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);
