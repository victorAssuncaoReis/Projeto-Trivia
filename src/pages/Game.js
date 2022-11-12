import React from 'react';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    index: 0,
    loading: true,
    question: [],
    answers: [],
    btns: false,
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
      localStorage.removeItem('token');
      window.location.replace('/');
    } else {
      this.setState({
        question: questions[index],
      }, () => {
        const { question } = this.state;
        const questionMapToWrong = question.incorrect_answers.map((ele, i) => {
          const wrongObject = {
            answer: ele,
            dataTestId: `wrong-answer-${i}`,
            className: 'wrong-class',
          };
          return wrongObject;
        });
        const correct = {
          answer: question.correct_answer,
          className: 'correct-class',
          btn: true,
          dataTestId: 'correct-answer' };
        this.setState({
          answers: this.shuffle([...questionMapToWrong, correct]),
          loading: false,
        });
      });
    }
  };

  handleClick = () => {
    this.setState({
      btns: true,
    });
  };

  shuffle = (array) => {
    const shuffledArray = [];
    const usedIndexes = [];

    let i = 0;
    while (i < array.length) {
      const randomNumber = Math.floor(Math.random() * array.length);
      if (!usedIndexes.includes(randomNumber)) {
        shuffledArray.push(array[randomNumber]);
        usedIndexes.push(randomNumber);
        i += 1;
      }
    }
    return shuffledArray;
  };
  /*   shuffleAnswers = (array, string) => {
    const allAnswers = array;
    const magicNumber = 5;
    const randomIndex = Math.floor(Math.random() * magicNumber);
    allAnswers.splice(randomIndex, 0, string);
    return allAnswers;
  }; */

  render() {
    const {
      loading,
      answers,
      btns,
      question: {
        category,
        question,
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
                { answers.map((el) => (
                  <button
                    type="button"
                    key={ el.dataTestId }
                    data-testid={ el.dataTestId }
                    onClick={ this.handleClick }
                    name={ el.dataTestId }
                    className={ btns ? el.className : 'btn-standard' }
                  >
                    { el.answer }
                  </button>)) }
              </div>
            </>
          )}
      </>
    );
  }
}
export default Game;
