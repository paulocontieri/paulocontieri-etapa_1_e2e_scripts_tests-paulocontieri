// cypress/e2e/login/login_usuario_invalido.cy.js

import '../../support/commands';
import * as elements_login from '../../support/elements/elements_login';
import { faker } from '@faker-js/faker';

describe('Login - Usuário/Senha inválidos', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
  });

  it('LG.2 - Deve exibir modal com mensagem de erro ao tentar login com usuário/senha inválidos', () => {
    const emailNaoCadastrado = faker.internet.email();
    const senhaAleatoria = faker.internet.password();

    cy.get(elements_login.login.email).type(emailNaoCadastrado, { force: true });
    cy.get(elements_login.login.password).type(senhaAleatoria, { force: true });
    cy.get(elements_login.login.acessarBtn).click({ force: true });

    cy.get('#modalText')
      .invoke('text')
      .then((text) => {
        const textoLimpo = text.replace(/\n/g, ' ').trim();
        expect(textoLimpo).to.include('Usuário ou senha inválido. Tente novamente ou verifique suas informações!');
      });

    cy.get('#btnCloseModal').click({ force: true });
  });
});
