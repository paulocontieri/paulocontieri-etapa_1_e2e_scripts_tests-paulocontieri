import '../../support/commands';
import * as elements_login from '../../support/elements/elements_login';
import * as elements_cadastro from '../../support/elements/elements_cadastro';
import { faker } from '@faker-js/faker';

describe('Cadastro - Cadastro com dados válidos', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/');
    cy.get(elements_login.login.registrarBtn).click();
    cy.wait(500); 
  });

  it('CD.2 - Deve realizar cadastro com sucesso com dados válidos', () => {
    const email = faker.internet.email();
    const nome = faker.person.fullName();
    const senha = faker.internet.password();

    cy.get(elements_cadastro.cadastro.email).type(email, { force: true });
    cy.get(elements_cadastro.cadastro.nome).type(nome, { force: true });
    cy.get(elements_cadastro.cadastro.senha).type(senha, { force: true });
    cy.get(elements_cadastro.cadastro.confirmarSenha).type(senha, { force: true });
    cy.get(elements_cadastro.cadastro.toggleSaldo).click({ force: true });

    cy.get(elements_cadastro.cadastro.cadastrarBtn).click({ force: true });

    cy.get('#modalText')
      .should('contain.text', 'foi criada com sucesso')
      .and('be.visible');

    cy.get('#btnCloseModal').click({ force: true });
  });
});
