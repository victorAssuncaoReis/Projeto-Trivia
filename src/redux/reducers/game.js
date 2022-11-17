import { START_TIMER, GET_INTERVAL, SAVE_COUNTER, SAVE_GRAVATAR } from '../actions';

const INITIAL_STATE = {
  counter: 30,
  myInterval: 0,
  gravatar: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_COUNTER:
    return { ...state, counter: action.payload };
  case START_TIMER:
    return { ...state, counter: state.counter - action.payload };
  case GET_INTERVAL:
    return { ...state, myInterval: action.payload };
  case SAVE_GRAVATAR:
    return { ...state, gravatar: action.payload };
  default:
    return state;
  }
};

export default game;
