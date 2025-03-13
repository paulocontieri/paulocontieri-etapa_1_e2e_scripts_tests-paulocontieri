// cypress/e2e/login/login_usuario_valido.cy.js

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


import '../../support/commands';
import * as elements_login from '../../support/elements/elements_login';
import * as elements_cadastro from '../../support/elements/elements_cadastro';
import { faker } from '@faker-js/faker';

describe('Cadastro + Login com usuário válido (fluxo completo)', () => {
  it('CD.2 + LG.3 - Deve realizar cadastro e login com sucesso', () => {
    const email = faker.internet.email();
    const nome = faker.person.fullName();
    const senha = faker.internet.password();
    let conta;

    cy.visit('https://bugbank.netlify.app/');
    cy.get(elements_login.login.registrarBtn).click();
    cy.wait(500);

    cy.get(elements_cadastro.cadastro.email).type(email, { force: true });
    cy.get(elements_cadastro.cadastro.nome).type(nome, { force: true });
    cy.get(elements_cadastro.cadastro.senha).type(senha, { force: true });
    cy.get(elements_cadastro.cadastro.confirmarSenha).type(senha, { force: true });
    cy.get(elements_cadastro.cadastro.toggleSaldo).click({ force: true });
    cy.get(elements_cadastro.cadastro.cadastrarBtn).click({ force: true });

    cy.get('#modalText')
      .should('contain.text', 'foi criada com sucesso')
      .invoke('text')
      .then((text) => {
        const match = text.match(/\d{3}-\d/);
        if (match) {
          conta = match[0];
          cy.log(`Conta criada: ${conta}`);
        } else {
          throw new Error('Número da conta não encontrado');
        }
      });

    cy.get('#btnCloseModal').click({ force: true });

    cy.get(elements_login.login.email).type(email, { force: true });
    cy.get(elements_login.login.password).type(senha, { force: true });
    cy.get(elements_login.login.acessarBtn).click({ force: true });
  });
});
