import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends React.Component {
  onClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <Header />
        <button
          type="button"
          onClick={ this.onClick }
          data-testid="btn-go-home"
        >
          HOME
        </button>
        <h1>RANKING</h1>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
