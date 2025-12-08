import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "./acessos.css";

export default function Editarchamados() {
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios.get(`https://helpdesck-1.onrender.com/chamados/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then(res => {
      setTitulo(res.data.titulo);
      setDescricao(res.data.descricao);
    }).catch(err => {
      console.error("Erro ao buscar chamado:", err);
      alert("Erro ao carregar chamado");
    });

  }, [id, token]);

  const salvar = async () => {
    try {
      await axios.put(
        `https://helpdesck-1.onrender.com/chamados/${id}`,
        { titulo, descricao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Chamado atualizado!");
      navigate("/chamados");

    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar alterações!");
    }
  };

  return (
    <div className="flex">
      <div className="conteiner">
        <h2>Editar Chamado</h2>

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

        <button onClick={salvar}>Salvar Alterações</button>
      </div>
    </div>
  );
}
