import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  state = {
    scoreCuttOff: 3,
  };

  handleClick = () => {
    const { history } = this.props;

    history.push('/');
  };

  render() {
    const { assertions, score } = this.props;
    const { scoreCuttOff } = this.state;
    return (
      <>
        <Header />
        {
          assertions < scoreCuttOff
            ? (<h2 data-testid="feedback-text">Could be better...</h2>)
            : (<h2 data-testid="feedback-text">Well Done!</h2>)
        }

        <Button
          handleClick={ this.handleClick }
          btnName="Jogar novamente"
          dataName="btn-play-again"
        />
      </>

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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
