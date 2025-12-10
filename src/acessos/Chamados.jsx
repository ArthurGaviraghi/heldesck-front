import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./acessos.css";

export default function Chamados() {
  const [chamadoss, setChamadoss] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const carregar = async () => {
    try {
      const res = await axios.get("https://helpdesck-1.onrender.com/chamados", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      setChamadoss(res.data.chamadoss ?? res.data);
      
    } catch (err) {
      console.error("Erro ao carregar chamados:", err);
      alert("Erro ao carregar chamados");
    }
  };

  const excluir = async (id) => {
    try {
      await axios.delete(`https://helpdesck-1.onrender.com/chamados/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      carregar();
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir chamado");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="flex">
      <div className="conteiner">
        <div className="centralizar">
          <h2>Meus chamados</h2>
          <button className="btc" onClick={() => navigate("/criar")}>
            Criar Novo
          </button>
        </div>

        <ul className="lista-chamados">
          {chamadoss.map((chamado) => (
            <li className="card-chamado" key={chamado.id}>
              <h3 className="titulo">{chamado.titulo}</h3>
              <p className="descricao">{chamado.descricao}</p>
              <p className="status">Status: {chamado.status}</p>
              <p className="prioridade">Prioridade: {chamado.prioridade}</p>
              <div className="acoes">
                <button onClick={() => navigate(`/editar/${chamado.id}`)}>
                  Editar
                </button>
                <button className="danger" onClick={() => excluir(chamado.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
