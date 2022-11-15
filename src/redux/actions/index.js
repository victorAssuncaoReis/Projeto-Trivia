export const SAVE_LOGIN = 'SAVE_LOGIN';
export const START_TIMER = 'START_TIMER';
export const GET_INTERVAL = 'GET_INTERVAL';
export const SAVE_COUNTER = 'SAVE_COUNTER';

export const saveLogin = (login) => ({ type: SAVE_LOGIN, payload: login });

export const saveCounter = (counter) => ({ type: SAVE_COUNTER, payload: counter });

export const startTimer = (number) => ({ type: START_TIMER, payload: number });

export const getInterval = (interval) => ({ type: GET_INTERVAL, payload: interval });
