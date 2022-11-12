import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  state = {
    scoreCuttOff: 3,
  };

  render() {
    const { assertions } = this.props;
    const { scoreCuttOff } = this.state;
    return (
      <div>
        <Header />
        {
          assertions < scoreCuttOff ? <h2>Could be better...</h2> : <h2>Well Done!</h2>
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
});

export default connect(mapStateToProps)(Feedback);
