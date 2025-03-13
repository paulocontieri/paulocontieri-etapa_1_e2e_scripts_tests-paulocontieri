//server.js

const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;



// Rota css / image / js ----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));


// Rota da index.html -------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});




// Define o diretório onde os relatórios estão localizados ------------------------------------------
const reportsDir = path.join(__dirname, 'cypress', 'reports');

// Define a rota para acessar os arquivos no diretório reports
app.get('/reports/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(reportsDir, fileName);

  // Verifica se o arquivo existe
  if (fs.existsSync(filePath)) {
    // Se existir, envia o arquivo como resposta
    res.sendFile(filePath);
  } else {
    // Se o arquivo não existir, envia uma resposta de erro 404
    res.status(404).send('Relatório não encontrado');
  }
});

// Define a rota para servir arquivos estáticos dos relatórios (CSS, JS, etc.)
app.use('/reports/assets', express.static(path.join(reportsDir, 'assets')));



// Rota: Login - Email Inválido
app.get('/login_email_invalido', (req, res) => {
  const cypressProcess = spawn('yarn', ['cypress', 'run', '--spec', 'cypress/e2e/login/login_email_invalido.cy.js', '--reporter', 'mochawesome'], {
    cwd: __dirname,
    shell: true
  });

  let output = '';
  cypressProcess.stdout.on('data', (data) => {
    output += data.toString();
    console.log(`${data}`);
  });

  cypressProcess.on('close', () => {
    const matchHTML = output.match(/\[mochawesome\] Report HTML saved to (.+)/);
    const htmlPath = matchHTML ? matchHTML[1] : 'Nenhum relatório HTML encontrado';
    const htmlURL = htmlPath.replace(reportsDir, `http://localhost:${PORT}/reports`).replace(/\\/g, '/');
    const htmlResponse = `<a href="${htmlURL}" target="_blank" class="btn btn-primary btn-lg btn-block">Visualizar Relatório Login Email Inválido</a>`;
    res.send(`${htmlResponse}`);
  });
});

// Rota: Login - Usuario Invalido
app.get('/login_usuario_invalido', (req, res) => {
  const cypressProcess = spawn('yarn', ['cypress', 'run', '--spec', 'cypress/e2e/login/login_usuario_invalido.cy.js', '--reporter', 'mochawesome'], {
    cwd: __dirname,
    shell: true
  });

  let output = '';
  cypressProcess.stdout.on('data', (data) => {
    output += data.toString();
    console.log(`${data}`);
  });

  cypressProcess.on('close', () => {
    const matchHTML = output.match(/\[mochawesome\] Report HTML saved to (.+)/);
    const htmlPath = matchHTML ? matchHTML[1] : 'Nenhum relatório HTML encontrado';
    const htmlURL = htmlPath.replace(reportsDir, `http://localhost:${PORT}/reports`).replace(/\\/g, '/');
    const htmlResponse = `<a href="${htmlURL}" target="_blank" class="btn btn-primary btn-lg btn-block">Visualizar Relatório Login Usuário Inválido</a>`;
    res.send(`${htmlResponse}`);
  });
});

// Rota: Login - Cadastro e Login Válido (fluxo completo)
app.get('/cadastro_login_valido', (req, res) => {
  const cypressProcess = spawn('yarn', ['cypress', 'run', '--spec', 'cypress/e2e/login/login_usuario_valido.cy.js', '--reporter', 'mochawesome'], {
    cwd: __dirname,
    shell: true
  });

  let output = '';
  cypressProcess.stdout.on('data', (data) => {
    output += data.toString();
    console.log(`${data}`);
  });

  cypressProcess.on('close', () => {
    const matchHTML = output.match(/\[mochawesome\] Report HTML saved to (.+)/);
    const htmlPath = matchHTML ? matchHTML[1] : 'Nenhum relatório HTML encontrado';
    const htmlURL = htmlPath.replace(reportsDir, `http://localhost:${PORT}/reports`).replace(/\\/g, '/');
    const htmlResponse = `<a href="${htmlURL}" target="_blank" class="btn btn-primary btn-lg btn-block">Visualizar Relatório Cadastro/Login Válido</a>`;
    res.send(`${htmlResponse}`);
  });
});



// Retorno servidor ----------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
