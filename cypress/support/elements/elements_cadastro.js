// cypress/support/elements/elements_cadastro.js
// Tela de Cadastro
export const cadastro = {
  email: 'form[class*="FormRegister"] input[name="email"]',
  nome: 'form[class*="FormRegister"] input[name="name"]',
  senha: 'form[class*="FormRegister"] input[name="password"]',
  confirmarSenha: 'form[class*="FormRegister"] input[name="passwordConfirmation"]',
  toggleSaldo: '#toggleAddBalance',
  cadastrarBtn: 'form[class*="FormRegister"] button[type="submit"]',
  voltarBtn: '#btnBackButton',

  // Mensagens de erro (campo obrigatório ou formato inválido)
  msgErroEmail: 'form[class*="FormRegister"] input[name="email"] ~ .input__warging',
  msgErroNome: 'form[class*="FormRegister"] input[name="name"] ~ .input__warging',
  msgErroSenha: 'form[class*="FormRegister"] input[name="password"] ~ .input__warging',
  msgErroConfirmarSenha: 'form[class*="FormRegister"] input[name="passwordConfirmation"] ~ .input__warging',
};
  