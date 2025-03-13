// cypress/support/elements/elements_transferencia.js

// Tela de Transferência
export const transferencia = {
    contaNumero: 'input[name="accountNumber"]',
    digito: 'input[name="digit"]',
    valor: 'input[name="transferValue"]',
    descricao: 'input[name="description"]',
    btnTransferir: 'form[class*="FormTransfer"] button[type="submit"]',
  
    // Modal pós transferência
    modalMensagem: '#modalText',
    btnFecharModal: '#btnCloseModal',
  };
  