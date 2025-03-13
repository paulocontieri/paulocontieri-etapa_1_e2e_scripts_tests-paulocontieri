// cypress/support/elements/elements_login.js

// Tela de Login
export const login = {
  email: 'form[class*="FormLogin"] input[name="email"]',
  password: 'form[class*="FormLogin"] input[name="password"]',
  acessarBtn: 'form[class*="FormLogin"] button[type="submit"]',
  registrarBtn: 'form[class*="FormLogin"] button:contains("Registrar")',
  mensagemErroEmail: 'form[class*="FormLogin"] input[name="email"] ~ .input__warging',
};

