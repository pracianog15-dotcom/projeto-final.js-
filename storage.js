// js/storage.js
// Funções para ler e salvar os usuários no localStorage

// Busca todos os usuários cadastrados (retorna um array)
export function buscarUsuarios() {
  const dados = localStorage.getItem("usuarios");

  // Se ainda não existe nada salvo, devolve um array vazio
  if (dados === null) {
    return [];
  }

  return JSON.parse(dados);
}

// Salva o array de usuários no localStorage
export function salvarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Procura um usuário pelo e-mail (retorna o objeto ou undefined)
export function buscarUsuarioPorEmail(email) {
  const usuarios = buscarUsuarios();
  const usuario = usuarios.find(u => u.email === email);
  return usuario;
}