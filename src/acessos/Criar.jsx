import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./acessos.css";

export default function Criarchamados() {
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const salvar = async () => {
    try {
      await axios.post('https://helpdesck-1.onrender.com/chamados', 
        { titulo, descricao },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/chamados');
    } catch (err) {
      console.error("Erro ao criar chamado", err);
      alert("Erro ao salvar chamados.");
    }
  };

  return (
    <div class="flex">
      <div class='conteiner'>
      <h2>Criar chamados</h2>
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
      />
      <input
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição"
      />
      <button onClick={salvar}>Salvar</button>
    </div>
    </div>
  );
}
