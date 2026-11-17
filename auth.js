// js/auth.js
// Funções de sessão (login, proteção de página e logout)

import { buscarUsuarioPorEmail } from "./storage.js";

// Guarda no localStorage quem fez login (sem a senha)
export function salvarSessao(usuario) {
  const sessao = {
    nome: usuario.nome,
    email: usuario.email
  };
  localStorage.setItem("usuarioLogado", JSON.stringify(sessao));
}

// Busca a sessão salva (retorna o objeto ou null)
export function buscarSessao() {
  const dados = localStorage.getItem("usuarioLogado");

  if (dados === null) {
    return null;
  }

  return JSON.parse(dados);
}

// Protege uma página: se não houver sessão válida, volta para o login
export function protegerPagina() {
  const sessao = buscarSessao();

  // Sem sessão salva
  if (sessao === null) {
    window.location.href = "login.html";
    return null;
  }

  // Sessão existe, mas o usuário não está mais cadastrado
  const usuario = buscarUsuarioPorEmail(sessao.email);
  if (usuario === undefined) {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
    return null;
  }

  return sessao;
}

// Encerra a sessão e volta para o login
export function fazerLogout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}