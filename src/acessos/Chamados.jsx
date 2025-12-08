import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./acessos.css";


export default function chamadoss() {
  const [chamadoss, setchamadoss] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const carregar = async () => {
    const res = await axios.get('https://helpdesck-1.onrender.com/chamados', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setchamadoss(res.data.chamadoss)
  }

  const excluir = async (id) => {
    await axios.delete(`https://helpdesck-1.onrender.com/chamados/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    carregar()
  }

  useEffect(() => { carregar() }, [])

  return (
     <div class='flex'>
    <div class='conteiner'>
     
      <div class='centralizar'>
      <h2>
        <img src="https://static.vecteezy.com/ti/vetor-gratis/p1/6711606-icone-lapis-isolado-em-fundo-branco-icone-lapis-moderno-e-sinal-simples-lapis-icone-design-ilustracao-lapis-desenhar-logo-design-vetor.jpg" alt="" />
        Meus chamados</h2>
      <button class='btc' onClick={() => navigate('/criar')}>Criar Nova</button>
      </div>
      <ul>
        {chamadoss.map(chamados => (
          <li key={chamados.id}>
            <div class="tx">
            {chamados.descricao}
            </div>
            <div class='bt'>
            <button onClick={() => navigate('/editar/' + chamados.id)}>Editar</button>
            <button class='um' onClick={() => excluir(chamados.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}
