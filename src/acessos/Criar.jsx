import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./acessos.css";

export default function Criarchamados() {
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [status, setStatus] = useState('aberto'); // Novo campo
  const [prioridade, setPrioridade] = useState('baixa'); // Novo campo
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const salvar = async () => {
    if (!titulo || !descricao)
      return alert("Preencha todos os campos");

    try {
      await axios.post(
        "https://helpdesck-1.onrender.com/chamados",
        { titulo, descricao, status, prioridade }, // Novos campos
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Chamado criado com sucesso!");
      navigate("/chamados");

    } catch (err) {
      console.error("Erro ao criar chamado:", err);
      alert("Erro ao salvar chamado.");
    }
  };

  return (
    <div className="flex">
      <div className="conteiner">
        <h2>Criar Chamado</h2>

        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <input
          placeholder="Prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        />

        <button onClick={salvar}>Salvar</button>
      </div>
    </div>
  );
}
