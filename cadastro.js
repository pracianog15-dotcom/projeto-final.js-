// js/cadastro.js
// Lógica da página de cadastro

console.log("cadastro.js carregou");

import { buscarUsuarios, salvarUsuarios } from "./storage.js";

const formulario = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

// Mostra uma mensagem de erro na tela
function mostrarErro(texto) {
  mensagem.textContent = texto;
  mensagem.classList.add("erro");
}

// Evento de envio do formulário
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // 1. Captura os dados do formulário
  const dados = new FormData(formulario);
  const nome = dados.get("nome").trim();
  const email = dados.get("email").trim().toLowerCase();
  const senha = dados.get("senha");
  const idade = Number(dados.get("idade"));
  const cidade = dados.get("cidade").trim();
  const cantada = dados.get("cantada").trim();
  const defeito = dados.get("defeito").trim();

  // 2. Validação dos campos obrigatórios
  if (nome === "" || email === "" || senha === "" || cidade === "" || cantada === "") {
    mostrarErro("Preencha todos os campos obrigatórios.");
    return;
  }

  if (idade < 18) {
    mostrarErro("Você precisa ter 18 anos ou mais.");
    return;
  }

  if (senha.length < 4) {
    mostrarErro("A senha precisa ter pelo menos 4 caracteres.");
    return;
  }

  // 3. Verifica se o e-mail já está cadastrado
  const usuarios = buscarUsuarios();
  const emailJaExiste = usuarios.find(u => u.email === email);

  if (emailJaExiste) {
    mostrarErro("Este e-mail já está cadastrado.");
    return;
  }

  // 4. Cria o novo usuário e salva
  const novoUsuario = {
    nome: nome,
    email: email,
    senha: senha,
    idade: idade,
    cidade: cidade,
    cantada: cantada,
    defeito: defeito
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  // 5. Avisa e vai para o login
  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
});