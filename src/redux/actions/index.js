export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API = 'RECEIVE_API';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_LOGIN_EMAIL = 'SAVE_LOGIN_INFO';

export const requestApi = () => ({ type: 'REQUEST_API' });

export const receiveApi = (payload) => (
  { type: 'RECEIVE_API', payload });

export const failedRequest = (error) => ({ type: FAILED_REQUEST, payload: error });

export const saveLoginName = (loginName) => ({
  type: SAVE_NAME,
  payload: loginName,
});

export const saveLoginEmail = (loginEmail) => ({
  type: SAVE_LOGIN_EMAIL,
  payload: loginEmail,
});

export function fetchApi() {
  return async (dispatch) => {
    dispatch(requestApi());
    try {
      const url = 'https://opentdb.com/api_token.php?command=request';
      const response = await fetch(url);
      const data = await response.json();
      const token = await data.token;
      localStorage.setItem('token', token);
      dispatch(receiveApi(token));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
