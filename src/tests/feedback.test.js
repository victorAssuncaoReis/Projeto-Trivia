import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'; 

describe('testa a página de feedback', () => {
  test('se tem uma imagem na tela', () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/feedback');
    });

    const avatarImage = screen.getByRole('img');

    expect(avatarImage).toBeInTheDocument();
  })

  test('se tem a pontuação do jogador', () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/feedback');
    });

    const playerScore = screen.getByRole('heading', { level: 2, name: /score/i})

    expect(playerScore).toBeInTheDocument();
  })
})