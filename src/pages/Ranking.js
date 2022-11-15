import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Button from '../components/Button';

class Ranking extends React.Component {
  state = {
    formatedEmail: '',
    index: 0,
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const formating = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ formatedEmail: formating });
  }

  handleClick = () => {
    window.location.replace('/');
  };

  render() {
    const { name, score } = this.props;
    const { formatedEmail, index } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <img
          src={ formatedEmail }
          alt="user gravatar"
        />
        <p data-testid={ `player-name-${index}` }>
          { name }
        </p>
        <p data-testid={ `player-score-${index}` }>
          { score }
        </p>
        <Button
          dataName="btn-go-home"
          handleClick={ this.handleClick }
          btnName="Jogar novamente"
        />
      </div>
    );
  }
}

Ranking.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
