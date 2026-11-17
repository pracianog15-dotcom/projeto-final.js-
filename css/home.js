// js/home.js
// Lógica da página Home

import { protegerPagina, fazerLogout } from "./auth.js";
import { buscarUsuarios } from "./storage.js";
import { perfisFicticios } from "./perfis.js";

const nomeUsuario = document.getElementById("nomeUsuario");
const saudacao = document.getElementById("saudacao");
const listaPerfis = document.getElementById("listaPerfis");
const avisoCurtida = document.getElementById("avisoCurtida");
const botaoSair = document.getElementById("botaoSair");

// Verifica se existe sessão válida (senão, vai para o login)
const sessao = protegerPagina();

// Cria um elemento com classe e texto (usa textContent, que é seguro)
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.classList.add(classe);
  elemento.textContent = texto;
  return elemento;
}

// Monta o card de um perfil
function criarCard(perfil) {
  const card = document.createElement("article");
  card.classList.add("card");

  const nome = criarElemento("h3", "card-nome", perfil.nome);
  const info = criarElemento("p", "card-info", perfil.idade + " anos - " + perfil.cidade);
  const cantada = criarElemento("p", "card-cantada", "\"" + perfil.cantada + "\"");

  // Se a pessoa não informou defeito, mostra um texto engraçado
  let textoDefeito = "Defeito: " + perfil.defeito;
  if (perfil.defeito === "") {
    textoDefeito = "Defeito: nenhum (será?)";
  }
  const defeito = criarElemento("p", "card-defeito", textoDefeito);

  const botao = criarElemento("button", "botao", "Curtir");
  botao.classList.add("botao-curtir");

  // Ao clicar em Curtir
  botao.addEventListener("click", function () {
    botao.textContent = "Curtido!";
    botao.classList.add("curtido");
    botao.disabled = true;
    avisoCurtida.textContent = "Você curtiu " + perfil.nome + "! Agora é só torcer para não ficar no vácuo.";
  });

  card.appendChild(nome);
  card.appendChild(info);
  card.appendChild(cantada);
  card.appendChild(defeito);
  card.appendChild(botao);

  return card;
}

// Junta os perfis fictícios com os usuários cadastrados e mostra na tela
function mostrarPerfis() {
  const todosPerfis = [];

  // Perfis fictícios
  perfisFicticios.forEach(perfil => {
    todosPerfis.push(perfil);
  });

  // Usuários cadastrados (menos quem está logado)
  const usuarios = buscarUsuarios();
  usuarios.forEach(usuario => {
    if (usuario.email !== sessao.email) {
      todosPerfis.push(usuario);
    }
  });

  // Cria um card para cada perfil
  todosPerfis.forEach(perfil => {
    const card = criarCard(perfil);
    listaPerfis.appendChild(card);
  });
}

// Só carrega a Home se a sessão for válida
if (sessao !== null) {
  nomeUsuario.textContent = sessao.nome;
  saudacao.textContent = "Olá, " + sessao.nome + "!";
  mostrarPerfis();
  botaoSair.addEventListener("click", fazerLogout);
}