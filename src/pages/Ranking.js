import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const tres = 3;
const quinze = 15;

class Ranking extends React.Component {
  onClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    // ORDENANDO EM ORDEM DESCRESCENTE
    const points = [quinze, 100, 1, 0, tres, 100, 1];
    const order = () => points.sort((a, b) => a - b);
    console.log(order());
    const numbers = order();
    // ===============================
    const { name, score } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Header />
        <button
          type="button"
          onClick={ this.onClick }
          data-testid="btn-go-home"
        >
          HOME
        </button>
        <h2>
          { name }
        </h2>
        <h2>
          { score }
        </h2>
        <h3>{ numbers }</h3>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  pontos: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
