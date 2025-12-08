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

      // Ajuste conforme formato da resposta
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
          <h2>
            <img
              src="https://static.vecteezy.com/ti/vetor-gratis/p1/6711606-icone-lapis-isolado-em-fundo-branco-icone-lapis-moderno-e-sinal-simples-lapis-icone-design-ilustracao-lapis-desenhar-logo-design-vetor.jpg"
              alt=""
            />
            Meus chamados
          </h2>

          <button className="btc" onClick={() => navigate("/criar")}>
            Criar Novo
          </button>
        </div>

        <ul>
          {chamadoss.map((chamado) => (
            <li key={chamado.id}>
              <div className="tx">
                <strong>{chamado.titulo}</strong> <br />
                {chamado.descricao}
              </div>

              <div className="bt">
                <button onClick={() => navigate(`/editar/${chamado.id}`)}>
                  Editar
                </button>

                <button className="um" onClick={() => excluir(chamado.id)}>
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
