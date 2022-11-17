import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Star from '../images/Star.png';
import Settings from '../images/Settings.png';
import './Header.css';
import { saveGravatar } from '../redux/actions';

class Header extends Component {
  state = {
    formatedEmail: '',
  };

  componentDidMount() {
    const { gravatarEmail, dispatch } = this.props;
    const hash = md5(gravatarEmail).toString();
    const formating = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ formatedEmail: formating });
    dispatch(saveGravatar(formating));
  }

  render() {
    const { name, score } = this.props;
    const { formatedEmail } = this.state;
    return (
      <div className="div-header">
        <img
          className="gravatar-image"
          data-testid="header-profile-picture"
          src={ formatedEmail }
          alt="user gravatar"
        />
        <p className="header-name" data-testid="header-player-name">{ name }</p>
        <img className="star" src={ Star } alt="star" />
        <p className="header-points">Pontos:</p>
        <p className="header-score" data-testid="header-score">{score}</p>
        <img className="settings" src={ Settings } alt="engrenagem cinza" />
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
  name: PropTypes.string,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);
