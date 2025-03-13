import '../../support/commands';
import * as elements_login from '../../support/elements/elements_login';
import * as elements_cadastro from '../../support/elements/elements_cadastro';
import * as elements_conta from '../../support/elements/elements_conta';
import * as elements_transferencia from '../../support/elements/elements_transferencia';
import { faker } from '@faker-js/faker';

describe('TR.2 - Transferência para conta inexistente', () => {
    let contaOrigem = {};
  
    before(() => {
      cy.visit('https://bugbank.netlify.app/');
      cy.get(elements_login.login.registrarBtn).click();
      cy.wait(500);
      const email = faker.internet.email();
      const nome = faker.person.fullName();
      const senha = faker.internet.password();
  
      cy.get(elements_cadastro.cadastro.email).type(email, { force: true });
      cy.get(elements_cadastro.cadastro.nome).type(nome, { force: true });
      cy.get(elements_cadastro.cadastro.senha).type(senha, { force: true });
      cy.get(elements_cadastro.cadastro.confirmarSenha).type(senha, { force: true });
      cy.get(elements_cadastro.cadastro.toggleSaldo).click({ force: true });
      cy.get(elements_cadastro.cadastro.cadastrarBtn).click({ force: true });
  
      cy.get('#modalText').invoke('text').then((text) => {
        const conta = text.match(/\d{3}-\d/)[0];
        contaOrigem = { email, senha, conta };
      });
      cy.get('#btnCloseModal').click({ force: true });
    });
  
    it('Deve mostrar erro ao tentar transferir para conta inexistente', () => {
      cy.visit('https://bugbank.netlify.app/');
      cy.get(elements_login.login.email).type(contaOrigem.email, { force: true });
      cy.get(elements_login.login.password).type(contaOrigem.senha, { force: true });
      cy.get(elements_login.login.acessarBtn).click({ force: true });
  
      cy.get(elements_conta.conta.btnTransferencia).click({ force: true });
  
      cy.get(elements_transferencia.transferencia.contaNumero).type('999', { force: true });
      cy.get(elements_transferencia.transferencia.digito).type('9', { force: true });
      cy.get(elements_transferencia.transferencia.valor).type('100', { force: true });
      cy.get(elements_transferencia.transferencia.descricao).type('Transferência inválida', { force: true });
      cy.get(elements_transferencia.transferencia.btnTransferir).click({ force: true });
  
      cy.get(elements_transferencia.transferencia.modalMensagem)
        .should('contain.text', 'Conta inválida ou inexistente');
      cy.get(elements_transferencia.transferencia.btnFecharModal).click({ force: true });
    });
  });
  