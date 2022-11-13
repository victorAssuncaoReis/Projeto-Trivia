import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'; 

describe('testa a página Ranking', () => {
  test('se tem um botao na tela', () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/ranking');
    });

    const buttonHome = screen.getByTestId('btn-go-home')

    expect(buttonHome).toBeInTheDocument();
  })

  test('se ao clicar no botao, volta para página inicial"Login"', () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/ranking');
    });

    const buttonHome = screen.getByTestId('btn-go-home')
    userEvent.click(buttonHome);

    expect(history.location.pathname).toBe('/');
  })
})