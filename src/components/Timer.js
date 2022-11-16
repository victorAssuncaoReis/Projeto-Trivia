import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startTimer, getInterval, saveCounter } from '../redux/actions';
import './Timer.css';

class Timer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const magicNumber = 30;
    dispatch(saveCounter(magicNumber));
    this.setTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.counter === 1) {
      this.stopTimer();
    }
  }

  myTimer = () => {
    const { dispatch } = this.props;
    dispatch(startTimer(1));
  };

  setTimer = () => {
    const oneSecond = 1000;
    const myInterval = setInterval(this.myTimer, oneSecond);
    const { dispatch } = this.props;
    dispatch(getInterval(myInterval));
  };

  stopTimer = () => {
    const { myInterval } = this.props;
    clearInterval(myInterval);
  };

  render() {
    const { counter } = this.props;
    return (
      <h3>
        Tempo:
        {counter}
      </h3>
    );
  }
}

Timer.propTypes = {
  counter: PropTypes.number,
  dispatch: PropTypes.func,
  myInterval: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  myInterval: state.game.myInterval,
  counter: state.game.counter,
});

export default connect(mapStateToProps)(Timer);
