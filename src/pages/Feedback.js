import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  state = {
    scoreCuttOff: 3,
  };

  render() {
    const { assertions, score } = this.props;
    const { scoreCuttOff } = this.state;
    return (
      <div>
        <Header />
        {
          assertions < scoreCuttOff
            ? (<h2 data-testid="feedback-text">Could be better...</h2>)
            : (<h2 data-testid="feedback-text">Well Done!</h2>)
        }
        <div>
          <h2>Placar total:</h2>
          <h2 data-testid="feedback-total-score">{ score }</h2>
        </div>
        <div>
          <h2>Respostas corretas:</h2>
          <h2 data-testid="feedback-total-question">{ assertions }</h2>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
