import '../../support/commands';
import * as elements_login from '../../support/elements/elements_login';
import * as elements_cadastro from '../../support/elements/elements_cadastro';
import * as elements_conta from '../../support/elements/elements_conta';
import * as elements_transferencia from '../../support/elements/elements_transferencia';
import * as elements_extrato from '../../support/elements/elements_extrato';
import { faker } from '@faker-js/faker';

describe('EX.1 - Exibição de transferência no extrato', () => {
  let contaOrigem = {}, contaDestino = {};

  before(() => {
    const criarConta = () => {
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
        cy.wrap({ email, senha, conta }).as('novaConta');
      });

      cy.get('#btnCloseModal').click({ force: true });
    };

    criarConta();
    cy.get('@novaConta').then(data => contaOrigem = data);
    criarConta();
    cy.get('@novaConta').then(data => contaDestino = data);
  });

  it('Deve exibir a transferência no extrato após realizar a operação', () => {
    const descricao = 'Transferência EX1';
    const valor = '100';

    cy.visit('https://bugbank.netlify.app/');
    cy.get(elements_login.login.email).type(contaOrigem.email, { force: true });
    cy.get(elements_login.login.password).type(contaOrigem.senha, { force: true });
    cy.get(elements_login.login.acessarBtn).click({ force: true });

    cy.get(elements_conta.conta.btnTransferencia).click({ force: true });

    cy.get(elements_transferencia.transferencia.contaNumero).type(contaDestino.conta.split('-')[0], { force: true });
    cy.get(elements_transferencia.transferencia.digito).type(contaDestino.conta.split('-')[1], { force: true });
    cy.get(elements_transferencia.transferencia.valor).type(valor, { force: true });
    cy.get(elements_transferencia.transferencia.descricao).type(descricao, { force: true });
    cy.get(elements_transferencia.transferencia.btnTransferir).click({ force: true });

    cy.get(elements_transferencia.transferencia.modalMensagem)
      .should('contain.text', 'Transferencia realizada com sucesso');
    cy.get(elements_transferencia.transferencia.btnFecharModal).click({ force: true });

    cy.get('#btnBack').click({ force: true });

    cy.get(elements_extrato.extrato.btnExtrato).click({ force: true });

    cy.contains(descricao).should('be.visible');
    cy.contains('-R$ 100,00').should('be.visible');
    cy.contains('Transferência enviada').should('be.visible');
  });
});
