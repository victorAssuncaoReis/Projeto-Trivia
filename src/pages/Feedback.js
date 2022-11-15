import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  state = {
    scoreCuttOff: 3,
  };

  handleClickLogin = (route) => {
    window.location.replace(route);
  };

  handleClickRanking = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  render() {
    const { assertions, score } = this.props;
    const { scoreCuttOff } = this.state;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          { assertions < scoreCuttOff ? 'Could be better...' : 'Well Done!'}
        </h2>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <Button
          dataName="btn-play-again"
          handleClick={ () => this.handleClickLogin('/') }
          btnName="Jogar novamente"
        />
        <Button
          dataName="btn-ranking"
          handleClick={ () => this.handleClickRanking('/ranking') }
          btnName="Ranking"
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
