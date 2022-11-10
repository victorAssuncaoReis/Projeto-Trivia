import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  handleClick = () => {
    const { history } = this.props;

    history.push('/');
  };

  render() {
    return (
      <>
        <Header />
        <Button
          handleClick={ this.handleClick }
          btnName="Jogar novamente"
          dataName="btn-play-again"
        />
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
