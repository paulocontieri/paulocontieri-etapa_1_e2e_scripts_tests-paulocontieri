import '../../support/commands';
import * as elements_login from '../../support/elements/elements_login';
import * as elements_cadastro from '../../support/elements/elements_cadastro';
import { faker } from '@faker-js/faker';

describe('Cadastro - Validação de E-mail Inválido', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
    cy.get(elements_login.login.registrarBtn).click();
    cy.wait(500); 
  });

  it('CD.1 - Deve exibir mensagem de erro com e-mail inválido', () => {
    const nome = faker.person.fullName();
    const senha = faker.internet.password();

    cy.get(elements_cadastro.cadastro.email).type('email_invalido.com', { force: true });
    cy.get(elements_cadastro.cadastro.nome).type(nome, { force: true });
    cy.get(elements_cadastro.cadastro.senha).type(senha, { force: true });
    cy.get(elements_cadastro.cadastro.confirmarSenha).type(senha, { force: true });
    cy.get(elements_cadastro.cadastro.toggleSaldo).click({ force: true });
    cy.get(elements_cadastro.cadastro.cadastrarBtn).click({ force: true });


    cy.get(elements_cadastro.cadastro.msgErroEmail).should('contain.text', 'Formato inválido');
  });
});
