import { SAVE_NAME, SAVE_LOGIN_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case SAVE_NAME:
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default player;
