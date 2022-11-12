import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

class Game extends React.Component {
  state = {
    index: 0,
    loading: true,
    question: [],
    mixAnswers: [],
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.getQuestions(token);
  }

  getQuestions = async (token) => {
    const { index } = this.state;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
    const questions = data.results;

    if (questions.length === 0) {
      localStorage.clear('token');
      window.location.replace('/');
    } else {
      this.setState({
        loading: false,
        question: questions[index],
      }, () => this.shuffleAnswers());
    }
  };

  shuffleAnswers = () => {
    const { question: {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } } = this.state;
    const allAnswers = [...incorrectAnswers];
    const magicNumber = 5;
    const randomIndex = Math.floor(Math.random() * magicNumber);
    allAnswers.splice(randomIndex, 0, correctAnswer);
    this.setState({ mixAnswers: allAnswers });
  };

  render() {
    const { loading,
      mixAnswers,
      question: {
        category,
        question,
        correct_answer: correctAnswer,
      },
    } = this.state;
    return (
      <>
        <Header />
        { loading
          ? <h1>Carregando...</h1>
          : (
            <>
              <h3 data-testid="question-category">{category}</h3>
              <p data-testid="question-text">{question}</p>
              <div data-testid="answer-options">
                { mixAnswers.map((el, i) => (
                  el === correctAnswer
                    ? (
                      <Button
                        key={ i }
                        btnName={ el }
                        dataName="correct-answer"
                        handleClick={ this.handleClick }
                      />
                    )
                    : (
                      <Button
                        key={ i }
                        btnName={ el }
                        dataName={ `wrong-answer-${i}` }
                        handleClick={ this.handleClick }
                      />

                    )
                ))}
              </div>
            </>
          )}
      </>
    );
  }
}
export default Game;
