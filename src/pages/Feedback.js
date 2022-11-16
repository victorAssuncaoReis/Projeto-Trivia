import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';
import LogoTrivia from '../images/LogoTrivia.png';
import './feedback.css';

class Feedback extends React.Component {
  state = {
    scoreCuttOff: 3,
    changeClass: good,
  };

  componentDidMount() {
    this.changeClass();
  }

  handleClickLogin = (route) => {
    window.location.replace(route);
  };

  handleClickRanking = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  changeClass = () => {
    const { scoreCuttOff } = this.state;
    const magicNumber = 3;
    if (scoreCuttOff < magicNumber) {
      this.setState({ changeClass: bad });
    } this.setState({ changeClass: good });
  };

  render() {
    const { assertions, score } = this.props;
    const { scoreCuttOff, changeClass } = this.state;
    return (
      <div className="div-feed">
        <Header />
        <img src={ LogoTrivia } alt="logo-trivia" />
        <h2 className={ changeClass } data-testid="feedback-text">
          { assertions < scoreCuttOff ? 'Could be better...' : 'Well Done!'}
        </h2>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <Button
          btnClass="play-again"
          dataName="btn-play-again"
          handleClick={ () => this.handleClickLogin('/') }
          btnName="Jogar novamente"
        />
        <Button
          btnClass="ranking"
          dataName="btn-ranking"
          handleClick={ () => this.handleClickRanking('/ranking') }
          btnName="Ver Ranking"
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
