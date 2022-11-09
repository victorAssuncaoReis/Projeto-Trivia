import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  addHashToEmail = () => {
    const { gravatarEmail } = this.props;
    const withHash = md5(gravatarEmail).toString();
    return `"${withHash}"`;
  };

  render() {
    const { name, score } = this.props;

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.addHashToEmail }
          alt="user gravatar"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">{ score }</h2>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({ // state é o objeto do estado global
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);
