import { REQUEST_API, RECEIVE_API, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  tokenInfo: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state };
  case RECEIVE_API:
    return { ...state, tokenInfo: action.payload };
  case FAILED_REQUEST:
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export default token;
