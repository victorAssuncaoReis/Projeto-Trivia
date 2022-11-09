import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'; 

describe('testa a página Login', () => {
  test('se está na rota inical "/"', () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('se os inputs de email e nome são renderizados na tela', () => {
    renderWithRouterAndRedux(<App/>)
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
  });

  test('se renderiza um botao', () => {
    renderWithRouterAndRedux(<App/>)
    const buttonEnter = screen.getByTestId('btn-play');

    expect(buttonEnter).toBeInTheDocument();
  });

  test('se o botao fica desativado caso os inputs são preenchidos incorretamente', () => {
    renderWithRouterAndRedux(<App/>)
    const buttonEnter = screen.getByTestId('btn-play');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    userEvent.type(inputEmail, 'tuliobarros.com');
    userEvent.type(inputName, '');

    expect(buttonEnter).toBeDisabled();
  });

  test('se o botao fica ativado caso os inputs sao preenchidos corretamente', () => {
    renderWithRouterAndRedux(<App/>)
    const buttonEnter = screen.getByTestId('btn-play');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    userEvent.type(inputEmail, 'tulio@barros.com');
    userEvent.type(inputName, 'tulio');

    expect(buttonEnter).not.toBeDisabled();
  })

  test('se tem o botao "configurações" na tela', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    const buttonSettings = screen.getByText('Configurações');
    
    expect(buttonSettings).toBeInTheDocument();
    
    userEvent.click(buttonSettings);
    const { pathname } = history.location;


    expect(pathname).toBe('/settings');
  })

  test('se ao clicar no botao"Jogar" vai para a rota"/game"', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const buttonEnter = screen.getByTestId('btn-play');

    userEvent.type(inputEmail, 'tulio@barros.com');
    userEvent.type(inputName, 'tulio');
    userEvent.click(buttonEnter);
    const { pathname } = history.location;

    expect(pathname).toBe('/game');
  })
})