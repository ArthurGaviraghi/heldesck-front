import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "./acessos.css";


export default function Editarchamados() {
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('https://helpdesck.onrender.com/chamados', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const chamados = res.data.chamadoss.find(t => t.id === parseInt(id))
      setDescricao(chamados?.descricao || '')
    })
  }, [id, token])

  const salvar = async () => {
    await axios.put(`https://helpdesck.onrender.com/chamados/${id}`, { titulo, descricao }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    navigate('/chamados')
  }

  return (
    <div class='flex'>
    <div class='conteiner'>
      <h2>Editar chamados</h2>
       <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <button onClick={salvar}>Salvar Alterações</button>
    </div>    </div>
  )
}
