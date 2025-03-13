// cypress/e2e/login/login_email_invalido.cy.js

import '../../support/commands';
import * as elements_login from '../../support/elements/elements_login';

describe('Login - Validação de E-mail Inválido', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
  });

  it('LG.1 - Deve exibir mensagem de erro com e-mail inválido', () => {
    const emailInvalido = 'email_invalido.com';

    cy.get(elements_login.login.email).type(emailInvalido, { force: true });

    cy.get(elements_login.login.acessarBtn).click({ force: true });

    cy.get(elements_login.login.mensagemErroEmail).should('contain.text', 'Formato inválido');
  });
});
