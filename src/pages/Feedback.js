import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  state = {
    scoreCuttOff: 3,
  };

  handleClick = (route) => {
    const { history } = this.props;

    history.push(route);
  };

  render() {
    const { assertions } = this.props;
    const { scoreCuttOff } = this.state;
    return (
      <>
        <Header />
        {
          assertions < scoreCuttOff ? <h2>Could be better...</h2> : <h2>Well Done!</h2>
        }
        <Button
          handleClick={ () => this.handleClick('/') }
          btnName="Jogar novamente"
          dataName="btn-play-again"
        />
        <Button
          handleClick={ () => this.handleClick('/ranking') }
          btnName="Ranking"
          dataName="btn-ranking"
        />
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
