import { SAVE_LOGIN, SAVE_SCORE, SAVE_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  case SAVE_SCORE:
    return { ...state, score: state.score + action.payload };
  case SAVE_ASSERTIONS:
    return { ...state, assertions: state.assertions + action.payload };
  default:
    return state;
  }
};

export default player;
