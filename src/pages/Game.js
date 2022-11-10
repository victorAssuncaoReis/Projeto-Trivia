import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Game extends React.Component {
  state = {
    category: [],
    rightAnswers: [],
    wrongAnswers: [],
    question: [],
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.getQuestions(token);
  }

  getQuestions = async (token) => {
    try {
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const response = await fetch(url);
      const data = await response.json();
      const questions = data.results;
      this.setState({
        category: questions.map((el) => el.category),
        rightAnswers: questions.map((el) => el.correct_answer),
        wrongAnswers: questions.map((el) => el.incorrect_answers),
        question: questions.map((el) => el.question),
      });
    } catch (error) {
      localStorage.clear('token');
      window.location.replace('/');
    }
  };

  render() {
    const { category, rightAnswers, wrongAnswers,
      question } = this.state;
    return (
      <div>
        <Header />
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          { rightAnswers.map((el, i) => (
            <Button
              key={ i }
              btnName={ el[0] }
              dataName="correct-answer"
            />))}
          { wrongAnswers.map((el, i) => (
            <Button
              key={ i }
              btnName={ el }
              dataName={ `wrong-answer-${i}` }
            />))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Game);
