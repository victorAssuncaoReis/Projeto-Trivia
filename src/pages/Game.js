import React from 'react';
import Header from '../components/Header';
/* import Button from '../components/Button'; */

class Game extends React.Component {
  state = {
    question: [],
    index: 0,
    loading: false,
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
        question: questions[index],
        loading: true,
      });
    }
  };

  render() {
    const { question, loading } = this.state;
    return (
      <div>
        { loading
          ? (
            <div>
              <Header />
              <h3 data-testid="question-category">{ question.category }</h3>
              <p data-testid="question-text">{ question.question }</p>
              <div data-testid="answer-options">
                {/*  { allAnswers.map((el, i) => (
                  <Button
                    type="button"
                    key={ i }
                    btnName={ el[i] }
                    dataName="correct-answer"
                  >
                    { el[i] }
                  </Button>))} */}
              </div>
            </div>)
          : <div>{' '}</div> }
      </div>
    );
  }
}

export default Game;

/*   randomOrder() {
    const myNum = 0.5;
    return (Math.round(Math.random()) - myNum);
  }
  Criar um state de index?

  const correctAnswer = trivia[index].correct_answer;
  const wrongAnswers = trivia[index].incorrect_answers[0];

  const renderCorrect = (
      <button
        type="button"
        data-testid="correct-answer"
        className="correct-answer"
      >
        {rightAnswer}
      </button>);

  const mapWrongAnsers = wrongAnwswers.map((answer, index) => (
      <button
        type="button"
        key={ index }
        data-testid={ `wrong-answer${index}` }
      >
        {answer}
      </button>
    ));

  }
  const allAnswers = [];
  allAnswers.push(correctAnswer, wrongAnswers);

  allAnswers.sort(this.randomOrder);

  return (
      <div>
        <Header />
        {trivia
        && (
          <main>
            <h1 data-testid="question-category">{trivia.category}</h1>
            <h2 data-testid="question-text">{trivia.question}</h2>
            <div data-testid="answer-options">
              {allAnswers.map((button) => button)}
            </div>
          </main>
        )}
      </div>
    );
  }
}
  */
