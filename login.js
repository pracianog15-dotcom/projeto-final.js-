// js/login.js
// Lógica da página de login

import { buscarUsuarioPorEmail } from "./storage.js";
import { salvarSessao } from "./auth.js";

const formulario = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

// Mostra uma mensagem de erro na tela
function mostrarErro(texto) {
  mensagem.textContent = texto;
  mensagem.classList.add("erro");
}

// Evento de envio do formulário
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // 1. Captura os dados digitados
  const dados = new FormData(formulario);
  const email = dados.get("email").trim().toLowerCase();
  const senha = dados.get("senha");

  if (email === "" || senha === "") {
    mostrarErro("Informe o e-mail e a senha.");
    return;
  }

  // 2. Procura o usuário pelo e-mail
  const usuario = buscarUsuarioPorEmail(email);

  if (usuario === undefined) {
    mostrarErro("Usuário não encontrado.");
    return;
  }

  // 3. Confere se a senha é exatamente igual à cadastrada
  if (usuario.senha !== senha) {
    mostrarErro("Senha incorreta.");
    return;
  }

  // 4. Login válido: salva a sessão e vai para a Home
  salvarSessao(usuario);
  window.location.href = "home.html";
});