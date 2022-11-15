export const SAVE_LOGIN = 'SAVE_LOGIN';
export const START_TIMER = 'START_TIMER';
export const GET_INTERVAL = 'GET_INTERVAL';
export const SAVE_COUNTER = 'SAVE_COUNTER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';

export const saveLogin = (login) => ({ type: SAVE_LOGIN, payload: login });

export const saveCounter = (counter) => ({ type: SAVE_COUNTER, payload: counter });

export const startTimer = (number) => ({ type: START_TIMER, payload: number });

export const getInterval = (interval) => ({ type: GET_INTERVAL, payload: interval });

export const saveScore = (score) => ({ type: SAVE_SCORE, payload: score });

export const saveAssertions = (assertions) => ({
  type: SAVE_ASSERTIONS,
  payload: assertions,
});
