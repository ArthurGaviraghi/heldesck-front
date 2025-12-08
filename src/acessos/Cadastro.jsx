import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('usuario');
  const navigate = useNavigate();

  const cadastrar = async () => {
  if (!nome || !email || !senha) {
    return alert("Preencha todos os campos");
  }

  try {
    const resposta = await axios.post(
      "https://helpdesck-1.onrender.com/usuarios/",
      { nome, email, senha, perfil },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    alert("Cadastro realizado com sucesso!");
    navigate("/login");

  } catch (erro) {
    console.error("Erro no cadastro:", erro);

    if (erro.response) {
      alert(erro.response.data?.mensagem || "Erro no servidor");
    } else {
      alert("Erro de conexão ao cadastrar usuário.");
    }
  }
};

  return (
    <div className='flex'>
      <div className='conteiner'>
        <h2>Cadastro</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
          <option value="usuario">Usuário</option>
          <option value="tecnico">Técnico</option>
        </select>
        <button onClick={cadastrar}>Criar Conta</button>
      </div>
    </div>
  );
}
