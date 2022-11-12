import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import './game.css';

class Game extends React.Component {
  state = {
    index: 0,
    loading: true,
    questions: [],
    answers: [],
    changeClass: false,
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
    const trivia = data.results;
    if (trivia.length === 0) {
      localStorage.removeItem('token');
      window.location.replace('/');
    } else {
      this.setState({
        loading: false,
        questions: trivia[index],
        answers: [...trivia[index]
          .incorrect_answers, trivia[index].correct_answer],
        changeClass: false,
      }, () => this.shuffleAnswers());
    }
  };

  shuffleAnswers = () => {
    const { answers } = this.state;
    const magicNumber = 0.5;
    const mix = answers.sort(() => Math.random() - magicNumber);
    this.setState({ answers: mix });
  }; // https://javascript.info/task/shuffle
  
  handleClick = () => {
    this.setState({ changeClass: true });
  };
  
  render() {
    const {
      loading,
      answers,
      changeClass,
      questions: {
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
                { answers.map((el, i) => (
                  el === correctAnswer
                    ? (
                      <Button
                        btnClass={ changeClass ? 'right' : 'gray' }
                        key={ i }
                        btnName={ el }
                        dataName="correct-answer"
                        handleClick={ this.handleClick }
                      />
                    )
                    : (
                      <Button
                        btnClass={ changeClass ? 'wrong' : 'gray' }
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
