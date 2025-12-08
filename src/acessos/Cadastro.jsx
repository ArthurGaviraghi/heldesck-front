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
      const resposta = await axios.post('https://helpdesck.onrender.com/usuarioS/', {
        nome,
        email,
        senha,
        perfil,
      });

      if (resposta.status === 201 || resposta.status === 200) {
        alert("Cadastro realizado com sucesso!");
        navigate('/login');
      } else {
        alert("Erro ao cadastrar.");
      }
    } catch (erro) {
      console.error("Erro no cadastro:", erro);
      alert("Erro ao cadastrar usuário. Verifique se o email já está em uso.");
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
